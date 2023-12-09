const mongoose = require('mongoose');

const deanSchema = new mongoose.Schema({
    deanId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    freeSlots: [{ day: String, time: String }], // Array of slot times, e.g., ['Thur 10 AM', 'Fri 10 AM']
    bookedSessions: [{ studentName: String, day: String, time: String }],
});

module.exports = mongoose.model('Dean', deanSchema);