import express from "express";
import authController from '../controllers/auth.controller.js';
import { accountExistSignup } from "../middlewares/auth/accountExistSignup.js";
import { accountExistSignin } from "../middlewares/auth/accountExistSignin.js"
import { accountHasBeenVerified } from "../middlewares/auth/accountHasBeenVerified.js"
import { passwordIsOk } from '../middlewares/auth/passwordIsOk.js'
import passport from "../middlewares/auth/passport.js";

const { signup, signin, signout } = authController

const router = express.Router();

router.post('/signup',
    accountExistSignup,
    signup)

router.post('/signin',
    accountExistSignin,
    accountHasBeenVerified,
    passwordIsOk,
    signin)

router.post('/signout',
    passport.authenticate('jwt', { session: false }),
    signout)

export default router;