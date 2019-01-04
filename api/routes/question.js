import express from 'express';
import questionController from '../controllers/question';
import questionvalidator from '../validators/questionvalidator';
import idvalidator from '../validators/idvalidator';

const router = express.Router();

const {
  createQuestion
} = questionController;

router.post('/', questionvalidator, createQuestion);

export default router;