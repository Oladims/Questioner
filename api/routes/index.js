import { Router } from 'express';
import meetup from './meetup';
import app from './app';

const router = new Router();

router.use('/meetups', meetup);

router.use('/', app);


export default router;