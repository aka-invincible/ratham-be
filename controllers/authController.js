const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const Student = require('../models/studentModel');
const Dean = require('../models/deanModel');

const generateToken = (userId, userType) => {
    return jwt.sign({ userId, type: userType }, 'secret-key');
};

const signupStudent = async(req, res) => {
    try {
        const { studentId, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = generateToken(studentId, 'student');

        const student = new Student({
            studentId,
            password: hashedPassword,
            name,
            token,
        });

        const savedStudent = await student.save();

        res.status(201).json({ token: savedStudent.token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginStudent = async(req, res) => {
    try {
        const { studentId, password } = req.body;

        const student = await Student.findOne({ studentId });
        if (!student || !(await bcrypt.compare(password, student.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ token: student.token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const signupDean = async(req, res) => {
    try {
        const { deanId, password, name, freeSlots } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = generateToken(deanId, 'dean');

        const dean = new Dean({
            deanId,
            password: hashedPassword,
            name,
            token,
            freeSlots
        });

        const savedDean = await dean.save();

        res.status(201).json({ token: savedDean.token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginDean = async(req, res) => {
    try {
        const { deanId, password } = req.body;

        const dean = await Dean.findOne({ deanId });
        if (!dean || !(await bcrypt.compare(password, dean.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ token: dean.token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    signupStudent,
    loginStudent,
    signupDean,
    loginDean,
};