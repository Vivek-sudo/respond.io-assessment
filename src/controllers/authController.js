const userService = require('../services/userService');

async function register(req, res, next) {
    try {
        const { username, password, name, email, isAdmin } = req.body;
        const user = await userService.registerUser(username, password, name, email, isAdmin);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const token = await userService.loginUser(username, password);
        res.json({ token });
    } catch (error) {
        next(error);
    }
}

module.exports = { register, login };
