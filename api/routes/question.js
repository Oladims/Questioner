import express from 'express';
import questionController from '../controllers/question';
import questionValidator from '../validators/questionValidator';
import idValidator from '../validators/idValidator';

const router = express.Router();

const {
  createQuestion, getQuestions, getQuestion,
  upvoteQuestion, downvoteQuestion,
} = questionController;

router.post('/', questionValidator, createQuestion);
router.get('/', getQuestions);
router.get('/:id', idValidator, getQuestion);
router.patch('/:id/upvote', idValidator, upvoteQuestion);
router.patch('/:id/downvote', idValidator, downvoteQuestion);

export default router;
