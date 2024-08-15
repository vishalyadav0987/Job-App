const express = require('express');
const router = express.Router();
const {
    register,
    login,
    logout,
    updateProfile,
} = require('../controllers/userControllers');
const protectedRoute = require('../middleware/protectedRoute')


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/profile/update').post(protectedRoute, updateProfile);



module.exports = router;