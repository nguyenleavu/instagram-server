const { User } = require('../../models');

const checkUsername = async (req, res, next) => {
    const { user_name } = req.body;
    const user = await User.findOne({ where: { user_name } });
    if (!user) {
        return next();
    } else {
        res.status(500).send({ message: 'Username already exists' });
    }
};

module.exports = checkUsername;
