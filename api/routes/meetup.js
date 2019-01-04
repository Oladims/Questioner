import express from 'express';
import meetupController from '../controllers/meetup';
import meetupvalidator from '../validators/meetupvalidator';
import idValidator from '../validators/idvalidator';

const {
    createMeetup, getMeetups} = meetupController;

const router = express.Router();

router.post('/', meetupvalidator, createMeetup);
router.get('/', getMeetups);
router.get('/:id', idValidator, getMeetup);
router.get('/upcoming', getUpcomingMeetups);

export default router;