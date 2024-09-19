const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb'); // Added MongoDB import
const app = express();
const port = process.env.PORT || 3005; // Updated to use environment port if available

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // Use environment variable or default URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit if MongoDB connection fails
    }
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000' // Use environment variable or default URL
}));

// Import routes
const notesRoutes = require('./routes/notesRoutes');
app.use('/api/notes', notesRoutes);

// Catch-all route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
});

// Error handling middleware 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server and connect to MongoDB
app.listen(port, async () => {
    await connectToDatabase(); // Connect to MongoDB before starting the server
    console.log(`Server running on port ${port}`);
});
