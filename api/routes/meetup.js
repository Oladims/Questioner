import express from 'express';
import meetupController from '../controllers/meetup';
import auth from '../validators/auth';

const { verifyToken } = auth;
const {
  createMeetup, getMeetup, getMeetups, rsvp, deleteMeetup,
} = meetupController;

const router = express.Router();

router.post('/', verifyToken, createMeetup);
router.get('/', verifyToken, getMeetups);
router.post('/:id/rsvps', verifyToken, rsvp);
router.get('/:id', verifyToken, getMeetup);
router.delete('/:id', verifyToken, deleteMeetup);
export default router;
