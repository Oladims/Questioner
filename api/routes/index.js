import { Router } from 'express';
import meetup from './meetup';
import question from './question';
import user from './user';
import app from './app';
import comment from './comments';

const router = new Router();

router.use('/meetups', meetup);
router.use('/questions', question);
router.use('/user', user);
router.use('/comment', comment);

router.use('/', app);

export default router;
