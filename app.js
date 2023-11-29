const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const deanRoutes = require('./routes/deanRoutes');


const app = express();
// const PORT = `127.0.0.1`;

const databaseName = 'college'


mongoose.connect('mongodb://127.0.0.1:27017/' + databaseName);

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', deanRoutes);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
})