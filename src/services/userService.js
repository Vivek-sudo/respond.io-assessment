const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateToken } = require('../utils/auth');
const { validateRegistrationInput } = require('../utils/validateInput');

async function registerUser(username, password, name, email, isAdmin) {
    if (!validateRegistrationInput(username, password)) {
        throw new Error('Invalid input');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, name, email, isAdmin });
    return user;
}

async function loginUser(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken({ username, userId: user.dataValues.id });
    return token;
}

module.exports = { registerUser, loginUser };
