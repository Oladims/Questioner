import express from 'express';
import questionController from '../controllers/question';

const router = express.Router();

const {
  createQuestion, getQuestion,
  upvoteQuestion, downvoteQuestion,
} = questionController;

router.post('/', createQuestion);
router.get('/:id', getQuestion);
router.patch('/:id/upvote', upvoteQuestion);
router.patch('/:id/downvote', downvoteQuestion);

export default router;
