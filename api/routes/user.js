import express from 'express';
import userController from '../controllers/user';

const router = express.Router();
const { signup, login, getUsersCount } = userController;

router.post('/signup', signup);
router.post('/login', login);
router.get('/count', getUsersCount);

export default router;
