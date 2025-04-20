import express from 'express';
import { loginUser, userSignup } from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup', userSignup);

router.post('/login', loginUser);


export default router;