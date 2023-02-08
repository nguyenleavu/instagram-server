const {
    User,
    Follower,
    Like,
    sequelizem,
    Post,
    Comment,
} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const register = async (req, res) => {
    const { full_name, user_name, phone, email, password } = req.body;
    try {
        // create a random string
        const salt = bcrypt.genSaltSync(10);
        // encode the password
        const hashPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            full_name,
            user_name,
            password: hashPassword,
            phone,
            email,
        });
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // find user by phone
    const user = await User.findOne({
        include: [
            {
                model: Follower,
                as: 'followers',
                attributes: ['following_user_id'],
            },
            {
                model: Follower,
                as: 'followings',
                attributes: ['follower_user_id'],
            },
            {
                model: Like,
                as: 'likes',
                attributes: ['user_id'],
            },
        ],
        where: { email },
    });

    // check password
    if (user) {
        const isAuth = bcrypt.compareSync(password, user.password);

        if (isAuth) {
            // create a token
            const token = jwt.sign(
                {
                    id: user.id,
                    user_name: user.user_name,
                    gender: user.gender,
                },
                'nguyenleavu',
                {
                    expiresIn: 60 * 6000000000000000,
                }
            );
            res.status(200).send({ user, token });
        } else {
            res.status(500).send({ message: 'Email or Password incorrect' });
        }
    } else {
        res.status(404).send({ message: 'User not found' });
    }
};

const uploadAvatar = async (req, res) => {
    const { user, file } = req;

    // get image url
    const avatarUrl = `http://localhost:4000/${file.path}`;

    // get user
    const currentUser = await User.findOne({
        where: { user_name: user.user_name },
    });
    currentUser.avatar = avatarUrl;
    await currentUser.save();

    res.status(201).send(currentUser);
};

const updateUser = async (req, res) => {
    const { user } = req;
    const { full_name, user_name, bio, email, phone, gender } = req.body;

    try {
        if (full_name && user_name && bio && email && phone && gender) {
            const currentUser = await User.findOne({
                where: { id: user.id },
                attributes: { exclude: ['password', 'avatar', 'tick'] },
            });

            currentUser.full_name = full_name;
            currentUser.user_name = user_name;
            currentUser.email = email;
            currentUser.phone = phone;
            currentUser.gender = gender;
            currentUser.bio = bio;
            await currentUser.save();

            return res.status(200).send(currentUser);
        } else {
            return res
                .status(400)
                .send({ message: 'Please fill in all fields' });
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

const searchUser = async (req, res) => {
    const { q } = req.query;
    const { user } = req;

    try {
        if (q) {
            const userList = await User.findAll({
                where: {
                    [Op.and]: [
                        { user_name: { [Op.like]: `%${q}%` } },
                        { user_name: { [Op.notIn]: [user.user_name] } },
                    ],
                },
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: Follower,
                        as: 'followers',
                        attributes: ['following_user_id'],
                    },
                    {
                        model: Follower,
                        as: 'followings',
                        attributes: ['follower_user_id'],
                    },
                    {
                        model: Like,
                        as: 'likes',
                        attributes: ['user_id'],
                    },
                ],
            });

            if (!userList) {
                return res.status(404).send({ message: 'User not found' });
            } else {
                return res.status(200).send(userList);
            }
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getDetailUser = async (req, res) => {
    const { user_name } = req.params;

    try {
        const user = await User.findOne({
            where: { user_name },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Follower,
                    as: 'followers',
                    attributes: ['following_user_id'],
                },
                {
                    model: Follower,
                    as: 'followings',
                    attributes: ['follower_user_id'],
                },               
                {
                    model: Post,
                    attributes: ['media_file'],
                    include: [
                        {
                            model: Like,
                            as: 'likes',
                            attributes: ['user_id'],
                        },
                        {
                            model: Comment,
                            as: 'comments',
                            attributes: ['user_id'],
                        },
                    ],
                },
            ],
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getSuggestedUserList = async (req, res) => {
    const { user } = req;
    const { limit } = req.query;

    try {
        const [suggestedUserList] =
            await sequelize.query(`select id,full_name,user_name,avatar,bio from users 
        where id not in (select following_user_id from followers where follower_user_id = ${user.id})
        and id != ${user.id}
        limit ${limit}`);

        return res.status(200).send(suggestedUserList);
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = {
    register,
    login,
    uploadAvatar,
    searchUser,
    getDetailUser,
    updateUser,
    getSuggestedUserList,
};
