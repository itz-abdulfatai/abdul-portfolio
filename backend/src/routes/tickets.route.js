import express from 'express';
import { createTicket, replyAsClient } from '../utils/tickets/sendTicket.js';

const router = express.Router();


router.post('/create', createTicket)
router.post('/replyAsCl', replyAsClient)











export default router;