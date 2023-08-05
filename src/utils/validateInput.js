function validateRegistrationInput(username, password) {
    if (!username || !password || username === password) {
        return false;
    }
    return true;
}

function validateNoteInput(title, content) {
    if (!title || !content) {
        return false;
    }
    return true;
}

module.exports = { validateRegistrationInput, validateNoteInput };