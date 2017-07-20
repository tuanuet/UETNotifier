/* eslint-env node */
import express from 'express';
const router = express.Router();
import ApiController from '../controller/Api.Controller';
import ApiAuthenticate from '../middleware/authenticate.api';
import AuthenticateWeb from '../middleware/authenticate.web';
import {DistinctionRequest} from '../middleware/distinction';
import UserController from '../controller/User.Controller';

router.post('/signup',
    DistinctionRequest(UserController.postSignUp,ApiController.postSignUp)
);

router.route('/login')
    .post(
        DistinctionRequest(AuthenticateWeb.callbackSignIn,ApiAuthenticate.callbackSignIn),
        DistinctionRequest(UserController.postAuthenticate,ApiController.postAuthenticate))
    .get(DistinctionRequest(UserController.getLogin,null));

router.get('/profile',ApiAuthenticate.isAuthenticate,ApiController.getProfile);

module.exports = router;
