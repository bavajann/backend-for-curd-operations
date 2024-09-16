const express = require('express');
const cors = require('cors');
const app = express();
const port = 3005;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://fullstack-crud-operations.vercel.app'  // Replace with the actual frontend URL
}));

// Import routes
const notesRoutes = require('./routes/notesRoutes');
app.use('/api/notes', notesRoutes);

// Catch-all route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
});

// Error handling middleware (Place this before app.listen)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
