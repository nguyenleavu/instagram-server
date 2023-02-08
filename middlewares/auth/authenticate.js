const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.header('token');
        const decode = jwt.verify(token, 'nguyenleavu');

        if (decode) {
            req.user = decode;
            return next();
        } else {
            res.status(401).send({ message: 'User must be login' });
        }
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

module.exports = authenticate;
