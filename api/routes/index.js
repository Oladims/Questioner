import { Router } from 'express';
import meetup from './meetup';
import question from './question';
import app from './app';


const router = new Router();

router.use('/meetups', meetup);
router.use('/questions', question);

router.use('/', app);


export default router;