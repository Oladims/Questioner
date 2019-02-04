import moment from 'moment';
import db from '../database';
import auth from '../validators/auth';
import responses from '../validators/responses';

export default class meetupController {
  static createMeetup(req, res) {
    const { error } = auth.validateMeetups(req.body);
    if (error) {
      responses.validationError(error, req, res);
    }
    const {
      topic, location, happeningOn, name, description, createdBy,
    } = req.body;
    const createdOn = moment();
    const queryString = 'INSERT INTO newmeetups (topic, location, happeningOn, createdOn, name, description, createdBy) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const params = [topic, location, happeningOn, createdBy, createdOn, name, description];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'Error processing...',
          errorDetails: err,
        });
      }
      const meetup = result.rows[0];
      return res.status(201).json({
        status: 201,
        data: [{
          meetup,
        }],
      });
    });
  }

  static getMeetups(req, res) {
    const queryString = 'SELECT * FROM newmeetups';
    return db.query(queryString, [], (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
      }
      const meetup = result.rows;
      return res.status(200).json({
        status: 200,
        data: [{
          meetup,
        }],
      });
    });
  }

  static getMeetup(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) {
      responses.validationError(error, req, res);
    }
    const queryString = 'SELECT * FROM newmeetups WHERE id = $1';

    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
      }
      const meetup = result.rows[0];
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          data: [{
            meetup,
          }],
        });
      }
      return responses.nonExisting('meetup', req, res);
    });
  }

  static async deleteMeetup(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) {
      return responses.validationError(error, req, res);
    }
    const queryString = 'DELETE FROM newmeetups WHERE id = $1  AND userid = $2 returning *';
    const params = [req.params.id, req.params.userId];
    try {
      const { rows } = await db.query(queryString, params);
      if (!rows[0]) {
        return responses.nonExisting('meetup', req, res);
      }
      return res.status(204).send({ message: 'meetup deleted successfully' });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static rsvp(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) {
      responses.validationError(error, req, res);
    }

    const queryString = 'SELECT * FROM newmeetups WHERE id = $1';
    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
      }

      if (result.rowCount > 0) {
        const meetupTopic = result.rows[0].topic;
        const { validationError } = auth.validateRsvp(req.body);
        if (validationError) {
          responses.validationError(req, res);
        }
        const { userId, response } = req.body;
        const queryString2 = 'INSERT INTO rsvps (meetupId, userId, response ) VALUES($1, $2, $3) RETURNING *';
        const params2 = [req.params.id, userId, response];
        return db.query(queryString2, params2, (err, result) => {
          if (err) {
            responses.errorProcessing(err, req, res);
          }
          const rsvps = result.rows[0];

          return res.status(201).json({
            status: 201,
            data: [{
              meetup: rsvps.meetupid,
              topic: meetupTopic,
              status: rsvps.response,
            }],
          });
        });
      }
      responses.alreadyExist('Meetup', req, res);
    });
  }
}
