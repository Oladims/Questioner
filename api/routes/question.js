import express from 'express';
import questionController from '../controllers/question';
import questionvalidator from '../validators/questionvalidator';
import idvalidator from '../validators/idvalidator';

const router = express.Router();

const {
  createQuestion, getQuestions, getQuestion
} = questionController;

router.post('/', questionvalidator, createQuestion);
router.get('/', getQuestions);
router.get('/:id', idvalidator, getQuestion);

export default router;