import moment from 'moment';
import jwt from 'jsonwebtoken';
import db from '../database';
import auth from '../validators/auth';
import responses from '../validators/responses';

export default class meetupController {
  static createMeetup(req, res) {
    const { error } = auth.validateMeetups(req.body);
    if (error) {
      return responses.validationError(error, req, res);
    }
    const token = req.headers.tokens;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const {
      topic, location, happeningOn, name, description,
    } = req.body;
    const createdOn = moment();
    const createdBy = decoded.id;

    const queryString = 'INSERT INTO meetups (topic, location, happeningOn, createdOn, name, description, createdBy) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const params = [topic, location, happeningOn, createdOn, name, description, createdBy];
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
    const queryString = 'SELECT * FROM meetups';
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

  static getMeetupsCount(req, res) {
    const queryString = 'SELECT * FROM meetups';
    return db.query(queryString, [], (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
      }
      const data = result.rowCount;
      return res.status(200).json({
        status: 200,
        data,
      });
    });
  }

  static getMeetup(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) {
      responses.validationError(error, req, res);
    }
    const queryString = 'SELECT * FROM meetups WHERE id = $1';

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

  static getMeetupByUserId(req, res) {
    const token = req.headers.tokens;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const createdBy = decoded.id;

    const queryString = 'SELECT * FROM meetups WHERE createdBy = $1';
    const params = [createdBy];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        responses.errorProcessing(err, req, res);
      }
      const meetup = result.rows;
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
    const token = req.headers.tokens;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const createdBy = decoded.id;

    const queryString = 'DELETE FROM meetups WHERE id = $1  AND createdBy = $2 returning *';
    const params = [req.params.id, createdBy];
    try {
      const { rows } = await db.query(queryString, params);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'You don"t have permission to delete this meetup, contact the meetup owner',
        });
      }
      return res.status(200).json({
        status: 200,
        data: [{
          message: 'meetup deleted successfully',
        }],
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static rsvp(req, res) {
    const { error } = auth.validateId(req.params.id);
    if (error) return responses.validationError(error, req, res);
    const token = req.headers.tokens;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const queryString = 'SELECT * FROM meetups WHERE id = $1';
    const params = [req.params.id];
    return db.query(queryString, params, (err, result) => {
      if (err) responses.errorProcessing(err, req, res);
      else if (result.rowCount > 0) {
        const userId = decoded.id;
        const meetupTopic = result.rows[0].topic;
        const { validationError } = auth.validateRsvp(req.body);
        if (validationError) responses.validationError(req, res);
        return db.query(`SELECT * FROM rsvps WHERE userId = ${userId} AND meetupid = ${req.params.id}`, (err, result) => {
          if (err) responses.errorProcessing(err, req, res);
          else if (result.rowCount > 0) {
            return res.status(403).json({
              status: 403,
              error: 'You have already rsvp for this meetup',
            });
          }
          else {
            const { response } = req.body;
            const queryString2 = 'INSERT INTO rsvps (meetupId, userId, response ) VALUES($1, $2, $3) RETURNING *';
            const params2 = [req.params.id, userId, response];
            return db.query(queryString2, params2, (err, result) => {
              if (err) responses.errorProcessing(err, req, res);
              if (result.rowCount > 0) {
                const rsvps = result.rows[0];
                return res.status(201).json({
                  status: 201,
                  data: [{
                    meetup: rsvps.meetupid,
                    topic: meetupTopic,
                    status: rsvps.response,
                  }],
                });
              }
            });
          }
        });
      }
      return responses.nonExisting('Meetup', req, res);
    });
  }
}
