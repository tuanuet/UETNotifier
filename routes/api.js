/* eslint-env node */
import express from 'express';
const router = express.Router();
import {reqIsDepartment} from '../middleware/authenticate';

router.get('/',(req,res) => {
    res.json(req.user);
});

router.get('/department',reqIsDepartment,(req,res) => {
    res.send('req is department');
});

module.exports = router;
