const { ObjectId } = require('mongodb');
const connect = require('../config/db');

// Create Note
exports.createNote = async (req, res) => {
    const { text } = req.body;
    try {
        const db = await connect();
        const collection = db.collection('notes');
        await collection.insertOne({ text });
        res.status(201).send('Note created');
    } catch (err) {
        console.error('Error creating note:', err);
        res.status(500).send(err.message);
    }
};

// List Notes
exports.listNotes = async (req, res) => {
    try {
        const db = await connect();
        const collection = db.collection('notes');
        const notes = await collection.find().toArray();
        res.status(200).json(notes);
    } catch (err) {
        console.error('Error listing notes:', err);
        res.status(500).send(err.message);
    }
};



// Delete Note
exports.deleteNote = async (req, res) => {
    const { id } = req.params;
    
    // Log the received ID
    console.log('Received ID:', id);

    // Check if ID is valid
    if (!ObjectId.isValid(id)) {
        return res.status(400).send('Invalid ID format');
    }

    try {
        const db = await connect();
        const collection = db.collection('notes');
        
        // Log the deletion attempt
        console.log('Attempting to delete note with ID:', id);
        
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        // Log the result of the deletion
        console.log('Delete result:', result);
        
        if (result.deletedCount === 0) {
            return res.status(404).send('Note not found');
        }
        
        res.status(200).send('Note deleted');
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).send(err.message);
    }
};
