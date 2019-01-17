import express from 'express';
import questionController from '../controllers/question';

const router = express.Router();

const {
  createQuestion, getQuestionByMeetupId, getQuestionById,
  upvoteQuestion, downvoteQuestion,
} = questionController;

router.post('/', createQuestion);
router.get('/meetup/:id', getQuestionByMeetupId);
router.get('/:id', getQuestionById);
router.patch('/:id/upvote', upvoteQuestion);
router.patch('/:id/downvote', downvoteQuestion);

export default router;
