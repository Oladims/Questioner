import db from '../database';
import responses from '../validators/responses';
import auth from '../validators/auth';

export default class meetupController {
  static createMeetup(req, res) {
    const { error } = auth.validateMeetups(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const {
      topic, location, happeningOn,
    } = req.body;
    const queryString = 'INSERT INTO meetup (topic, location, happeningOn ) VALUES($1, $2, $3) RETURNING *';
    const params = [topic, location, happeningOn];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const meetup = result.rows[0];
      const token = auth.generateToken(meetup);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          meetup,
        }],
      });
    });
  }

  static getMeetups(req, res) {
    const queryString = 'SELECT * FROM meetup';
    return db.query(queryString, [], (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const meetup = result.rows[0];
      const token = auth.generateToken(meetup);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          meetup,
        }],
      });
    });
  }

  static getMeetup(req, res) {
    const { id } = req.params;
    const { error } = auth.validateId(id);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const queryString = 'SELECT * FROM meetup WHERE id = $1';
    const params = id;
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: err,
        });
      }
      const meetup = result.rows[0];
      const token = auth.generateToken(meetup);
      return res.status(201).json({
        status: 201,
        data: [{
          token,
          meetup,
        }],
      });
    });
  }

  static rsvp(req, res) {
    const { error } = auth.validateRsvp(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    const {
      meetupId, userId, response,
    } = req.body;

    const queryString = 'SELECT * FROM rsvp WHERE userId = $1 AND meetupId = $2';
    const params = [userId, meetupId];
    return db.query(queryString, params, (err, result) => {
      if (err) {
        return responses.errorProcessing(req, res);
      }
      if (result.rowCount > 0) {
        return responses.errorAccountExist(req, res);
      }

      const queryString2 = 'INSERT INTO rsvps (meetup, userId, response ) VALUES($1, $2, $3) RETURNING *';
      const params2 = [meetupId, userId, response];
      return db.query(queryString2, params2, (err, result) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: err,
          });
        }
        const user = result.rows[0];
        const token = auth.generateToken(user);
        return res.status(201).json({
          status: 201,
          data: [{
            token,
            user,
          }],
        });
      });
    });
  }
}
