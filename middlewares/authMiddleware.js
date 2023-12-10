const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');
const Dean = require('../models/deanModel');

const authMiddleware = async(req, res, next) => {
    try {
        // console.log('Here');
        const token = req.headers.authorization.split(' ')[1];
        // console.log('THere', token);
        const decoded = jwt.verify(token, 'secret-key');
        console.log(decoded.type);

        if (decoded.type === 'student') {
            console.log("userId ", typeof decoded.userId);
            const student = await Student.findOne({ studentId: decoded.userId });
            if (!student || student.token !== token) {
                throw new Error('Authentication failed');
            }
            req.studentName = student.name;
            req.userId = decoded.userId;
            next();
        } else if (decoded.type === 'dean') {
            console.log("userId ", decoded.userId);
            const dean = await Dean.findOne({ deanId: decoded.userId });
            console.log("dean ", dean);
            if (!dean || dean.token !== token) {
                throw new Error('Authentication failed');
            }
            req.userId = decoded.userId;
            next();
        } else {
            throw new Error('Invalid user type');
        }
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;