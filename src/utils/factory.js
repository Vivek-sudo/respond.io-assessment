const Note = require('../models/note');

function createPersonalNote(title, content, userId) {
    return Note.create({
        title,
        content,
        userId,
        type: 'personal',
    });
}

function createWorkNote(title, content, userId) {
    return Note.create({
        title,
        content,
        userId,
        type: 'work',
    });
}

module.exports = { createPersonalNote, createWorkNote };
