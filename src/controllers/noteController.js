const noteService = require('../services/noteService');

async function createNote(req, res, next) {
    try {
        const { title, content, type } = req.body;
        const { userId } = req.user;
        const note = await noteService.createNote(title, content, userId, type);
        res.json(note);
    } catch (error) {
        next(error);
    }
}

async function getAllNotes(req, res, next) {
    try {
        const { userId } = req.user;
        const notes = await noteService.getAllNotes(userId);
        res.json(notes);
    } catch (error) {
        next(error);
    }
}

async function getNoteById(req, res, next) {
    try {
        const noteId = req.params.id;
        const { userId } = req.user;
        const note = await noteService.getNoteById(noteId, userId);
        res.json(note);
    } catch (error) {
        next(error);
    }
}

async function updateNote(req, res, next) {
    try {
        const { title, content } = req.body;
        const noteId = req.params.id;
        const { userId } = req.user;
        const note = await noteService.updateNote(noteId, title, content, userId);
        res.json(note);
    } catch (error) {
        next(error);
    }
}

async function deleteNote(req, res, next) {
    try {
        const noteId = req.params.id;
        const { userId } = req.user;
        await noteService.deleteNote(noteId, userId);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        next(error);
    }
}

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote };