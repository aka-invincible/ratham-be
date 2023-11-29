const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    token: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Student', studentSchema);