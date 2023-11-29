const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Dean = require('../models/deanModel');

router.use(authMiddleware);

router.get('/dean/sessions', async(req, res) => {
    try {
        const freeSessions = [
            { day: 'Thursday', time: '10:00 AM' },
            { day: 'Friday', time: '10:00 AM' },
            { day: 'Saturday', time: '10:00 AM' },
        ];
        res.send({ freeSessions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/dean/book', async(req, res) => {
    try {
        const { deanId, day, time } = req.body;
        const dean = await Dean.findById(deanId);
        dean.bookedSessions.push({
            studentName: req.studentName,
            day,
            time,
        });
        await dean.save();
        res.json({ message: 'Session booked successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;