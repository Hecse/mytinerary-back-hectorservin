import express from "express";
import authController from '../controllers/auth.controller.js';
import { accountExistSignup } from "../middlewares/auth/accountExistSignup.js";

const {signup} = authController

const router = express.Router();

router.post('/signup', accountExistSignup, signup)

export default router;