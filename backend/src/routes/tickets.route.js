import express from 'express';
import { createTicket, replyAsClient } from '../utils/tickets/sendTicket.js';
import { recaptchaMiddleware } from '../middlewares/recaptchaMiddleware.js';

const router = express.Router();


router.post('/create',recaptchaMiddleware, createTicket)
router.post('/replyAsCl', replyAsClient)











export default router;