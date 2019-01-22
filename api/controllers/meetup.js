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
      topic, location, happeningOn,
    } = req.body;
    const createdOn = moment();
    const queryString = 'INSERT INTO meetup (topic, location, happeningOn, createdOn ) VALUES($1, $2, $3, $4) RETURNING *';
    const params = [topic, location, happeningOn, createdOn];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
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
    const queryString = 'SELECT * FROM meetup';
    return db.query(queryString, [], (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
      }
      const meetup = result.rows;
      return res.status(201).json({
        status: 201,
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
    const queryString = 'SELECT * FROM meetup WHERE id = $1';

    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
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


  static rsvp(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) {
      responses.validationError(error, req, res);
    }

    const queryString = 'SELECT * FROM meetup WHERE id = $1';
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
