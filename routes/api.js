/* eslint-env node */
import express from 'express';
const router = express.Router();

import ApiController from '../controller/Api.Controller';
/**
 * All about Resource
 */
router.route('/kindofannoucement')
    .get(ApiController.getAllKindOfAnnoucement)
    .post(ApiController.postKindOfAnnoucement);

router.route('/kindofnew')
    .get(ApiController.getAllKindOfNew)
    .post(ApiController.postKindOfNew);

/**
 * All about Annoucement
 */
router.route('/annoucement')
    .get(ApiController.getAllAnnoucement)
    .post(ApiController.postAnnoucement);

router.route('/annoucement/:id')
    .get(ApiController.getAnnoucement);
/**
 *
 */

module.exports = router;
