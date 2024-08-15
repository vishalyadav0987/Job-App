const express = require('express');
const router = express.Router();
const {
    registerCompany,
} = require('../controllers/companyControllers');
const protectedRoute = require('../middleware/protectedRoute')


router.route('/register').post(protectedRoute, registerCompany);



module.exports = router;