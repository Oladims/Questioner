import express from 'express';
import userController from '../controllers/user';

const router = express.Router();
const { signup, login } = userController;

router.post('/signup', signup);
router.post('/login', login);

export default router;
