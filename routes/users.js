/* eslint-env node */
import express from 'express';
const router = express.Router();
import {postSignUp,postAuthenticate} from '../controller/User.Controller';

router.post('/signup',postSignUp);

router.post('/login',postAuthenticate);

module.exports = router;
