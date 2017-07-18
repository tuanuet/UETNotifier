/* eslint-env node */
import express from 'express';
const router = express.Router();
import {postSignUp,postAuthenticate} from '../controller/User.Controller';
import {callbackSignIn} from '../middleware/authenticate';

router.post('/signup',postSignUp);

router.post('/signin',callbackSignIn,postAuthenticate);

module.exports = router;
