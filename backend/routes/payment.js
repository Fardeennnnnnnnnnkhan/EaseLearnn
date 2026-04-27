import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { createSession } from '../controller/paymentController.js';

const router = express.Router();

router.post('/create-session', isAuth, createSession);

export default router;
