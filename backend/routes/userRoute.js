import express from 'express';
import { User } from '../models/user.js';
import { userLogin, userRegister } from './userAuth.js';


const router = express.Router();

router.route("/login").post(userLogin);

router.route("/register").post(userRegister);

export default router;