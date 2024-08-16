const express = require('express');
const router = express.Router();
const { postJob, getAllJobs } = require('../controllers/jobControllers');
const protectedRoute = require('../middleware/protectedRoute')


router.route('/post').post(protectedRoute, postJob)
router.route('/get').get(protectedRoute, getAllJobs);


module.exports = router;
