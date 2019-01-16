import express from 'express';
import meetupController from '../controllers/meetup';
import meetupValidator from '../validators/meetup';
import idValidator from '../validators/id';
import rsvpValidator from '../validators/rsvp';
import rsvpController from '../controllers/rsvp';

const { response } = rsvpController;
const {
  createMeetup, getMeetup, getMeetups, getUpcomingMeetups,
} = meetupController;

const router = express.Router();

router.post('/', createMeetup);
router.get('/', getMeetups);
router.get('/upcoming', getUpcomingMeetups);
router.get('/:id', idValidator, getMeetup);
router.post('/:id/rsvps', rsvpValidator, idValidator, response);
export default router;
