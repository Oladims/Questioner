import express from 'express';
import questionController from '../controllers/question';
import auth from '../validators/auth';

const { verifyToken } = auth;

const router = express.Router();

const {
  createQuestion, getQuestionsByMeetupId, getQuestionById,
  upvoteQuestion, downvoteQuestion, comment, getComments,
  getQuestionsCount, getQuestionsByUserId, getCommentsByUserId,
} = questionController;

router.post('/', verifyToken, createQuestion);
router.post('/comments', verifyToken, comment);
router.get('/count', getQuestionsCount);
router.get('/user', getQuestionsByUserId);
router.get('/:id/comments', verifyToken, getComments);
router.get('/userComments', verifyToken, getCommentsByUserId);
router.get('/meetup/:id', verifyToken, getQuestionsByMeetupId);
router.get('/:id', verifyToken, getQuestionById);
router.patch('/:id/upvote', verifyToken, upvoteQuestion);
router.patch('/:id/downvote', verifyToken, downvoteQuestion);

export default router;
