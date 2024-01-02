const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 7000;
const config = require('./Config/config.js');
const User = require('./Models/Users/user.js');

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

app.post('/signup', async (req, res) => {
    try {
      const { username, email, mobile, password } = req.body;
      const newUser = new User({ username, email, mobile, password });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
