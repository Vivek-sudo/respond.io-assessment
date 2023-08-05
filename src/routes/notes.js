const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const noteController = require('../controllers/noteController');

// Create a new note
router.post('/', authenticateToken, noteController.createNote);

// Retrieve all notes
router.get('/', authenticateToken, noteController.getAllNotes);

// Retrieve a specific note
router.get('/:id', authenticateToken, noteController.getNoteById);

// Update a note
router.put('/:id', authenticateToken, noteController.updateNote);

// Delete a note
router.delete('/:id', authenticateToken, noteController.deleteNote);

module.exports = router;