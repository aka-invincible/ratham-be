const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup/student', authController.signupStudent);
router.post('/login/student', authController.loginStudent);
router.post('/signup/dean', authController.signupDean);
router.post('/login/dean', authController.loginDean);

module.exports = router;