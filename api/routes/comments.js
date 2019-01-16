import express from 'express';
import userController from '../controllers/user';

const router = express.Router();
const { comment } = userController;

router.post('/', comment);

export default router;
