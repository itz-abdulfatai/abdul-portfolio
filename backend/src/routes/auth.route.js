import express from "express";
import { loginCOntroller } from "../controllers/auth.controller.js";

const router = express.Router()

// auth routes
router.post('/login', loginCOntroller)


export default router