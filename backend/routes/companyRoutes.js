const express = require('express');
const router = express.Router();
const {
    registerCompany,
    updateCompany,
    getAllCompany,
    getSingleCompanyDetails,
} = require('../controllers/companyControllers');
const protectedRoute = require('../middleware/protectedRoute')


router.route('/register').post(protectedRoute, registerCompany);
router.route('/update/:id').put(protectedRoute, updateCompany);
router.route('/get').get(protectedRoute, getAllCompany);
router.route('/get/:companyId').get(protectedRoute, getSingleCompanyDetails);



module.exports = router;