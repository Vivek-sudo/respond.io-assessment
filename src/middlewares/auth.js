const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const auth = req.header('Authorization');
    let token;
    if (auth) {
        token = auth.split(' ')[1];
    }

    if (!token) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
