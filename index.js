const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration
// MongoDB connection (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://20190188:ddPpAZfaKXtmaefe@coligo.wo5xvth.mongodb.net/?retryWrites=true&w=majority');

// Define mongoose schemas for Announcement and Quiz
const announcementSchema = new mongoose.Schema({
    announcer: String,
    announcer_photo: String,
    course: String,
    text: String
});

const quizSchema = new mongoose.Schema({
    title: String,
    course: String,
    topic: String,
    due_date: String,
    type: String
});

// Create mongoose models for Announcement and Quiz
const Announcement = mongoose.model('Announcement', announcementSchema);
const Quiz = mongoose.model('Quiz', quizSchema);

// API routes

// Retrieve all announcements
app.get('/api/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve all quizzes
app.get('/api/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new announcement
app.post('/api/announcements', async (req, res) => {
    try {
        const newAnnouncement = await Announcement.create(req.body);
        res.status(201).json(newAnnouncement);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new quiz
app.post('/api/quizzes', async (req, res) => {
    try {
        const newQuiz = await Quiz.create(req.body);
        res.status(201).json(newQuiz);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an announcement by ID
app.put('/api/announcements/:id', async (req, res) => {
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAnnouncement);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a quiz by ID
app.put('/api/quizzes/:id', async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an announcement by ID
app.delete('/api/announcements/:id', async (req, res) => {
    try {
        await Announcement.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a quiz by ID
app.delete('/api/quizzes/:id', async (req, res) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
