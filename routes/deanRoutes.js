const express = require('express');
const router = express.Router();
const deanController = require('../controllers/deanController');

router.use('/dean', deanController);

module.exports = router;