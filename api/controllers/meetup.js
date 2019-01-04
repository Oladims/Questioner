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
  }
};