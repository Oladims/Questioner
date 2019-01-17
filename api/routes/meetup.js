import express from 'express';
import meetupController from '../controllers/meetup';

const {
  createMeetup, getMeetup, getMeetups, rsvp,
} = meetupController;

const router = express.Router();

router.post('/', createMeetup);
router.get('/', getMeetups);
router.post('/:id/rsvps', rsvp);
router.get('/:id', getMeetup);
export default router;
