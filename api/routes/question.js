import express from 'express';
import questionController from '../controllers/question';
import questionValidator from '../validators/question';
import idValidator from '../validators/id';

const router = express.Router();

const {
  createQuestion, getQuestion,
  upvoteQuestion, downvoteQuestion,
} = questionController;

router.post('/', questionValidator, createQuestion);
router.get('/:id', idValidator, getQuestion);
router.patch('/:id/upvote', idValidator, upvoteQuestion);
router.patch('/:id/downvote', idValidator, downvoteQuestion);

export default router;
