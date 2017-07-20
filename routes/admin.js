/* eslint-env node */
import express from 'express';
const router = express.Router();
import {
    getDashboard,
    getManagementAccount,
    postAccount,
} from '../controller/Admin.Controller';

router.get('/dashboard',getDashboard);
router.route('/manage/account/:role')
    .get(getManagementAccount)
    .post(postAccount);

module.exports = router;