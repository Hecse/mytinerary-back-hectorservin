import express from "express";
import authController from '../controllers/auth.controller.js';
import { accountExistSignup } from "../middlewares/auth/accountExistSignup.js";
import { accountExistSignin } from "../middlewares/auth/accountExistSignin.js"
import { accountHasBeenVerified } from "../middlewares/auth/accountHasBeenVerified.js"
import {passwordIsOk} from '../middlewares/auth/passwordIsOk.js'

const { signup, signin } = authController

const router = express.Router();

router.post('/signup',
    accountExistSignup,
    signup)

router.post('/signin',
    accountExistSignin,
    accountHasBeenVerified,
    passwordIsOk,
    signin)

export default router;