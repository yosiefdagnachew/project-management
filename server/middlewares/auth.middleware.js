const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }

        const [authType, token] = authorizationHeader.split(' ');

        if (authType !== 'Bearer' || !token) {
            throw new Error('Invalid authorization header');
        }

        console.log('Authorization token:', token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded);

        req.userData = decoded;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).json({
            error: 'Unauthorized',
            message: 'Authentication failed',
        });
    }
};
