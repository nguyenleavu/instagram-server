const { User } = require('../../models');

const checkEmail = async(req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return next();
    } else {
        res.status(500).send({ message: 'Email is already registered' });   
    }
};

module.exports = checkEmail;
