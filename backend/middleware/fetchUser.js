const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key';

const fetchuser = (req, res, next) => {
    // get user from the jwt token
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Invalid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({ error: "Invalid token" })
    }
}

module.exports = fetchuser;
