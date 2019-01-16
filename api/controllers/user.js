import moment from 'moment';
import db from '../database';

export default class meetupController {
  static createUser(req, res, next) {
    const user = req.body;
    const {
      id, topic, location, happeningOn, tags,
    } = user;
    const queryString = 'INSERT INTO meetups (location, topic, happeningOn, tags) VALUES ($1, $2, $3, $4)';
    const params = [location, topic, happeningOn, Array[tags]];
    db.query(queryString, params, (err, res) => {
      res.status(201).send({
        status: 201,
        message: 'Your meetup has been created successfully.',
        data: [res.rows[0]],
      });
    });
  }
}