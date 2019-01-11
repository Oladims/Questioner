import express from 'express';
import meetupController from '../controllers/meetup';
import meetupValidator from '../validators/meetupvalidator';
import idValidator from '../validators/idValidator';
import rsvpValidator from '../validators/rsvpValidator';
import rsvpController from '../controllers/rsvp';

const { response } = rsvpController;
const {
  createMeetup, getMeetup, getMeetups, getUpcomingMeetups,
} = meetupController;

const router = express.Router();

router.post('/', meetupValidator, createMeetup);
router.get('/', getMeetups);
router.get('/upcoming', getUpcomingMeetups);
router.get('/:id', idValidator, getMeetup);
router.post('/:id/rsvps', rsvpValidator, idValidator, response);
export default router;
