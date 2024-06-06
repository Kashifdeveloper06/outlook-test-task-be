const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Failed to authenticate token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

module.exports = verifyToken;
