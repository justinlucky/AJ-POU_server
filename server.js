const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 7000;
const config = require('./Config/config.js');
const userController = require('./Controllers/UsersController.js')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    });
});

app.post('/signup', userController.signup);
app.post('/login', userController.login);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
