import { meetupRecords as meetupRecords } from '../db/db';
import Meetups from '../models/meetup';

export default {
  createMeetup: (req, res) => {
    const mLength = meetupRecords.length;
    req.body.id = mLength > 0 ? meetupRecords[mLength - 1].id + 1 : 1;
    const meetup = new Meetups(req.body);
    meetupRecords.push(meetup);
    return res.status(201).send({
      status: 201,
      message: 'Your meetup has been created successfully.',
      data: [meetup]
    });
  },
  getMeetups: (req, res) => {
    if (meetupRecords.length === 0) {
      return res.status(200).send({
        status: 200,
        message: 'Meetup record is empty.',
        data: []
      });
    }
    return res.status(200).send({ 
        status: 200,
        data: meetupRecords 
      });
  },
  getMeetup: (req, res) => {
    const { id } = req.params;
    const meetup = meetupRecords.find(c => c.id === id);

    if (!meetup) {
      return res.status(404).send({
         status: 404,
         error: 'Meetup not found' });
    }
    return res.status(200).send({
        status: 200,
        data: [meetup] 
      });
  },

};