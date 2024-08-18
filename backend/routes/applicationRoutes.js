const express = require('express');
const router = express.Router();
const { applyJob, applicantOfApplication, getAllApplicantOnJob, updateStatus } = require('../controllers/applicationControllers');
const protectedRoute = require('../middleware/protectedRoute')


router.route('/apply/:id').post(protectedRoute, applyJob);
router.route('/get').get(protectedRoute, applicantOfApplication);
router.route('/get/applicant/:id').get(protectedRoute, getAllApplicantOnJob);
router.route('/status/update/:id').post(protectedRoute, updateStatus);


module.exports = router;