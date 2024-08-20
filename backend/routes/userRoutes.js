const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    updateProfile,
    getUserOwnDetails,
} = require('../controllers/userControllers');
const protectedRoute = require('../middleware/protectedRoute')


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(protectedRoute, getUserOwnDetails);
router.route('/profile/update').post(protectedRoute, updateProfile);



module.exports = router;