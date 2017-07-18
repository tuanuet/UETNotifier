/* eslint-env node */
import express from 'express';
const router = express.Router();
import {reqIsDepartment} from '../middleware/authenticate';
import {info ,infoStudent} from '../controller/Api.Controller';
router.get('/info',info);

router.get('/department',reqIsDepartment,(req,res) => {
    res.send('req is department');
});
router.get('/stu',infoStudent)
module.exports = router;
