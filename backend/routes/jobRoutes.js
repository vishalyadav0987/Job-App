const express = require('express');
const router = express.Router();
const { postJob, getAllJobs, getJobById, getAllJobsOfAdmin, updateJob } = require('../controllers/jobControllers');
const protectedRoute = require('../middleware/protectedRoute')


router.route('/post').post(protectedRoute, postJob)
router.route('/get').get(protectedRoute, getAllJobs);
router.route('/get/:id').get(protectedRoute, getJobById);
router.route('/getall').get(protectedRoute, getAllJobsOfAdmin);
router.route('/update/:id').put(protectedRoute, updateJob);


module.exports = router;
