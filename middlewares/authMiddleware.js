const mongoose = require('mongoose');

const deanSchema = new mongoose.Schema({
    deanId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    freeSlots: [{ day: String, time: String }],
    bookedSessions: [{ studentName: String, day: String, time: String }],
});

module.exports = mongoose.model('Dean', deanSchema);
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