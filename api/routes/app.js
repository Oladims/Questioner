import express from 'express';
import app from '../controllers/app';

const { message } = app;

const router = express.Router();

router.get('/', message);

export default router;