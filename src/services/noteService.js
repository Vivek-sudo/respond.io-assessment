const { createPersonalNote, createWorkNote } = require('../utils/factory');
const { validateNoteInput } = require('../utils/validateInput');
const Note = require('../models/note');
const { redisGetAsync, redisSetAsync } = require('../config/redis');

async function createNote(title, content, userId, type) {
    if (!validateNoteInput(title, content)) {
        throw new Error('Invalid input');
    }

    if (type === 'personal') {
        return createPersonalNote(title, content, userId);
    } else if (type === 'work') {
        return createWorkNote(title, content, userId);
    } else {
        throw new Error('Invalid note type');
    }
}

async function getAllNotes(userId) {
    const cachedNotes = await redisGetAsync(`user:${userId}:notes`);
    if (cachedNotes) {
        return JSON.parse(cachedNotes);
    }
    const notes = await Note.findAll({ where: { userId } });

    await redisSetAsync(`user:${userId}:notes`, JSON.stringify(notes));

    return notes;
}

async function getNoteById(noteId, userId) {
    const cachedNote = await redisGetAsync(`note:${noteId}`);
    if (cachedNote) {
        return JSON.parse(cachedNote);
    }

    const note = await Note.findOne({ where: { id: noteId, userId } });
    if (!note) {
        throw new Error('Note not found');
    }

    await redisSetAsync(`note:${noteId}`, JSON.stringify(note));

    return note;
}

async function updateNote(noteId, title, content, userId) {
    if (!validateNoteInput(title, content)) {
        throw new Error('Invalid input');
    }

    const note = await Note.findOne({ where: { id: noteId, userId } });
    if (!note) {
        throw new Error('Note not found');
    }

    note.title = title;
    note.content = content;
    await note.save();

    return note;
}

async function deleteNote(noteId, userId) {
    const note = await Note.findOne({ where: { id: noteId, userId } });
    if (!note) {
        throw new Error('Note not found');
    }

    await note.destroy();
}

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
};
