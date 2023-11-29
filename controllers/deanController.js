const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Dean = require('../models/deanModel');

router.use(authMiddleware);

router.get('/pending-sessions', async(req, res) => {
    try {
        const dean = await Dean.findOne({ deanId: req.userId });
        const now = new Date();

        const pendingSessions = dean.bookedSessions.filter(
            (session) => {
                const sessionTime = new Date(`${session.day} ${session.time}`);
                return sessionTime > now;
            }
        );
        res.json({ pendingSessions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;