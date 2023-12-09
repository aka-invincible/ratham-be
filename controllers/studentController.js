const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Dean = require('../models/deanModel');

router.use(authMiddleware);

router.get('/dean/sessions', async(req, res) => {
    try {
        const deanId = req.body.deanId;
        const dean = await Dean.findOne({ deanId });
        const freeSessions = dean.freeSlots;
        res.send({ freeSessions });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.post('/dean/book', async(req, res) => {
//     try {
//         const { deanId, day, time } = req.body;
//         const dean = await Dean.findOne({ deanId });
//         const isSlotFree = dean.freeSlots.some((slot) => slot.day === day && slot.time === time);
//         if (!isSlotFree) {
//             return res.status(400).json({ message: 'Selected slot is not available' });
//         }
//         console.log(dean.deanId);
//         dean.bookedSessions.push({
//             studentName: req.studentName,
//             day,
//             time,
//         });
//         dean.freeSlots = dean.freeSlots.filter((slot) => slot.day !== day);
//         console.log(dean.freeSlots);
//         await dean.save();
//         res.json({ message: 'Session booked successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// })

router.post('/dean/book', async(req, res) => {
    try {
        const { deanId, day, time } = req.body;

        const updatedDean = await Dean.findOneAndUpdate({ deanId, 'freeSlots.day': day, 'freeSlots.time': time }, {
            $push: {
                bookedSessions: {
                    studentName: req.studentName,
                    day,
                    time,
                },
            },
            $pull: {
                freeSlots: { day, time },
            },
        }, { new: true });

        if (!updatedDean) {
            return res.status(400).json({ message: 'Selected slot is not available' });
        }

        res.json({ message: 'Session booked successfully', updatedDean });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;