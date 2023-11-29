const mongoose = require('mongoose');

const deanSchema = new mongoose.Schema({
    deanId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    bookedSessions: [{ studentName: String, day: String, time: String }],
});

module.exports = mongoose.model('Dean', deanSchema);