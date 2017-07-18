/* eslint-env node */
import express from 'express';
const router = express.Router();

import {
    getAllKindOfAnnoucement,
    postKindOfAnnoucement,
    postKindOfNew,
    getAllKindOfNew,

} from '../controller/Api.Controller';

import {
    getAnnoucement,
    getAllAnnoucement,
    postAnnoucement
} from '../controller/Api.Controller';


/**
 * All about Resource
 */

router.route('/kindofannoucement')
    .get(getAllKindOfAnnoucement)
    .post(postKindOfAnnoucement);

router.route('/kindofnew')
    .get(getAllKindOfNew)
    .post(postKindOfNew);

/**
 * All about Annoucement
 */
router.route('/annoucement')
    .get(getAllAnnoucement)
    .post(postAnnoucement);

router.route('/:id')
    .get(getAnnoucement);
/**
 *
 */

module.exports = router;
