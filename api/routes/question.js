import express from 'express';
import questionController from '../controllers/question';
import auth from '../validators/auth';

const { verifyToken } = auth;

const router = express.Router();

const {
  createQuestion, getQuestionByMeetupId, getQuestionById,
  upvoteQuestion, downvoteQuestion,
} = questionController;

router.post('/', verifyToken, createQuestion);
router.get('/meetup/:id', verifyToken, getQuestionByMeetupId);
router.get('/:id', verifyToken, getQuestionById);
router.patch('/:id/upvote', verifyToken, upvoteQuestion);
router.patch('/:id/downvote', verifyToken, downvoteQuestion);

export default router;
