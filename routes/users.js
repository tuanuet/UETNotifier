/* eslint-env node */
import express from 'express';
const router = express.Router();
import {postSignUp,postAuthenticate, getProfile} from '../controller/User.Controller';
import {callbackSignIn ,isAuthenticate} from '../middleware/authenticate';


router.post('/signup',postSignUp);

router.post('/signin',callbackSignIn,postAuthenticate);

router.get('/profile',isAuthenticate,getProfile);

module.exports = router;
