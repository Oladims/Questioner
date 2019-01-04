import express from 'express';
import meetupController from '../controllers/meetup';
import meetupvalidator from '../validators/meetupvalidator';

const {
    createMeetup} = meetupController;

const router = express.Router();

router.post('/', meetupvalidator, createMeetup);

export default router;