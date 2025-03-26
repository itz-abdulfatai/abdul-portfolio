import express from 'express';
import { createTicket, replyAsClient } from '../utils/tickets/sendTicket.js';
import { recaptchaMiddleware } from '../middlewares/recaptchaMiddleware.js';
import { sendQuoteRequest } from '../utils/tickets/sendQuoteRequest.js';

const router = express.Router();


router.post('/create',recaptchaMiddleware, createTicket)
router.post('/sendQuoteRequest',recaptchaMiddleware, sendQuoteRequest)
router.post('/replyAsCl', replyAsClient)











export default router;