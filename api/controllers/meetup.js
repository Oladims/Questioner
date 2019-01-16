import moment from 'moment';
import { meetupRecords } from '../db/db';
import Meetups from '../models/meetup';
import db from '../database';
// import meetupValidator from '../validators/meetup';
// import idValidator from '../validators/id';
// import rsvpValidator from '../validators/rsvp';
// import rsvpController from "./rsvp";

export default class meetupController {
  static createMeetup(req, res, next) {
    const meetup = req.body;
    const {
      id, topic, location, happeningOn, tags,
    } = meetup;
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

  static getMeetups(req, res) {
    if (meetupRecords.length === 0) {
      return res.status(200).send({
        status: 200,
        message: 'Meetup record is empty.',
        data: [],
      });
    }
    return res.status(200).send({
      status: 200,
      data: meetupRecords,
    });
  }

  static getMeetup(req, res) {
    const { id } = req.params;
    const meetup = meetupRecords
      .find(presentMeetup => presentMeetup.id === id);

    if (!meetup) {
      return res.status(404).send({
        status: 404,
        error: 'Meetup not found',
      });
    }
    return res.status(200).send({
      status: 200,
      data: [meetup],
    });
  }

  static getUpcomingMeetups(req, res) {
    const upcomingMeetup = meetupRecords
      .filter(presentMeetup => new Date(presentMeetup.happeningOn) > new Date(Date.now()));
    if (upcomingMeetup.length === 0) {
      return res.status(200).send({
        status: 200,
        message: 'There are no upcoming meetups yet.',
        data: [],
      });
    }
    const sortDate = upcomingMeetup.sort((a, b) => {
      const farDate = new Date(a.happeningOn);
      const nearDate = new Date(b.happeningOn);
      return farDate - nearDate;
    });
    return res.status(200).send({
      status: 200,
      data: sortDate,
    });
  }
}
