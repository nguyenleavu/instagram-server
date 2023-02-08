const { User } = require('../../models');

const checkPhone = async (req, res, next) => {
    const { phone } = req.body;
    const user = await User.findOne({ where: { phone } });
    if (!user) {
        return next();
    } else {
        res.status(500).send({ message: 'phone number has been used' });
    }
};

module.exports = checkPhone;
