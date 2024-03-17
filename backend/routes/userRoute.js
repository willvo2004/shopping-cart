import express from 'express';
import { User } from '../models/user.js';
import { userAuth } from '../middleware/auth.js'
import { userLogin, userLogout, userRegister } from './userAuth.js';
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser())

router.route("/login").post(userLogin);

router.route("/register").post(userRegister);

router.get("/profile", userAuth, async (request, response) => {
    response.status(200).json(request.user);
})

router.route("/logout").post(userLogout);

export default router;