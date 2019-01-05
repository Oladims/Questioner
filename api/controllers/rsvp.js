import { meetupRecords, rsvpRecords } from '../db/db';
import Rsvp from '../models/Rsvp';

export default {
    response: (req, res) => {
        const rsvp = req.body;
        const meetup = meetupRecords.find(obj => obj.id === parseInt(rsvp.meetup, 10));

        if (!meetup) return res.status(404).send({
            status: 404,
            error: 'Meetup does not exist.'
        });
        rsvp.topic = meetup.topic;
        const newRsvp = new Rsvp(rsvp);
        rsvpRecords.push(newRsvp);

        return res.status(200).send({
            status: 200,
            message: 'Your response has been added.',
            data: [newRsvp],
        });
    }
};