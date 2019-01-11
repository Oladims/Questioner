import { meetupRecords, rsvpRecords } from '../db/db';
import Rsvp from '../models/rsvp';

export default {
  response: (req, res) => {
    const rsvp = req.body;
    const rsvpInDb = rsvpRecords.length;
    const meetup = meetupRecords
      .find(presentMeetup => presentMeetup.id === parseInt(rsvp.meetup, 10));

    if (!meetup) {
      return res.status(404).send({
        status: 404,
        error: 'Meetup can not be found.',
      });
    }
    rsvp.topic = meetup.topic;
    req.body.id = rsvpInDb > 0 ? rsvpRecords[rsvpInDb - 1].id + 1 : 1;
    const newRsvp = new Rsvp(rsvp);
    
    rsvpRecords.push(newRsvp);

    return res.status(200).send({
      status: 200,
      message: 'Your response has been added.',
      data: [newRsvp],
    });
  },
};
