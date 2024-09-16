const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// Create Note
router.post('/create', notesController.createNote);

// List Notes
router.get('/list', notesController.listNotes);  // Updated to /list

// Delete Note
router.delete('/delete/:id', notesController.deleteNote);

module.exports = router;
