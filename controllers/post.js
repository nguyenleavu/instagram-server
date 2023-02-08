const { Op } = require('sequelize');
const {
    Post,
    Like,
    Comment,
    LikeComment,
    User,
    Follower,
    StoryStatus,
    Story,
} = require('../models');

const createPost = async (req, res) => {
    const { user, file } = req;
    const { caption } = req.body;

    if (file) {
        // get photos url
        const photoUrl = `http://localhost:4000/${file.path}`;

        try {
            const newPost = await Post.create({
                user_id: user.id,
                caption,
                media_file: photoUrl,
            });
            res.status(201).send(newPost);
        } catch (error) {
            res.status(200).send(error);
        }
    } else {
        res.status(404).send('Uploaded file again! ');
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { caption } = req.body;

    const post = await Post.findOne({ where: { id } });

    if (post) {
        if (caption) {
            post.caption = caption;
            await post.save();
            return res.status(200).send(post);
        }
    } else {
        return res.status(404).send('Post not found');
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findOne({ where: { id } });

        if (post) {
            await Post.destroy({ where: { id } });
            return res.status(200).send('Post successfully deleted');
        } else {
            return res.status(404).send('Post not found');
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getAllPost = async (req, res) => {
    const { page, type } = req.query;
    const { user } = req;
    const PAGE_SIZE = 10;
    const offset = (page - 1) * PAGE_SIZE;

    try {
        if (!page) {
            return res.status(500).send('Page not found');
        }

        if (type === 'following') {
            const following = await Follower.findAll({
                attributes: ['following_user_id'],
                where: { follower_user_id: user.id },
            });

            const followingId = [];

            following.map((item) => followingId.push(item.following_user_id));

            const postList = await Post.findAll({
                offset,
                limit: PAGE_SIZE,
                include: [
                    {
                        model: User,
                        attributes: ['user_name', 'full_name', 'avatar'],
                        include: [
                            {
                                model: Story,
                                attributes: ['id', 'story_file', 'createdAt'],
                                order: [['createdAt', 'DESC']],
                                include: [
                                    {
                                        model: StoryStatus,
                                        as: 'isSeen',
                                        attributes: ['user_id'],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: Like,
                        as: 'likes',
                        attributes: ['user_id'],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        attributes: [
                            'id',
                            'user_id',
                            'comments',
                            'createdAt',
                            'updatedAt',
                        ],
                        order: [['createdAt', 'DESC']],
                        include: [
                            {
                                model: User,
                                attributes: [
                                    'user_name',
                                    'full_name',
                                    'avatar',
                                ],
                            },
                            {
                                model: LikeComment,
                                as: 'likeComments',
                                attributes: ['user_id'],
                            },
                            {
                                model: Story,
                                attributes: ['id', 'story_file', 'createdAt'],
                                order: [['createdAt', 'DESC']],
                            },
                        ],
                    },
                ],
                where: {
                    user_id: { [Op.in]: followingId },
                },
                order: [['createdAt', 'DESC']],
            });
            return res.status(200).send(postList);
        } else {
            const postList = await Post.findAll({
                offset,
                limit: PAGE_SIZE,
                include: [
                    {
                        model: User,
                        attributes: ['user_name', 'full_name', 'avatar'],
                        include: [
                            {
                                model: Follower,
                                as: 'followings',
                                attributes: ['follower_user_id'],
                            },
                            {
                                model: Story,
                                attributes: ['id', 'story_file', 'createdAt'],
                                order: [['createdAt', 'DESC']],
                                include: [
                                    {
                                        model: StoryStatus,
                                        as: 'isSeen',
                                        attributes: ['user_id'],
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        model: Like,
                        as: 'likes',
                        attributes: ['user_id'],
                    },
                    {
                        model: Comment,
                        as: 'comments',
                        attributes: [
                            'id',
                            'user_id',
                            'comments',
                            'createdAt',
                            'updatedAt',
                        ],
                        order: [['createdAt', 'DESC']],
                        include: [
                            {
                                model: User,
                                attributes: [
                                    'user_name',
                                    'full_name',
                                    'avatar',
                                ],
                            },
                            {
                                model: LikeComment,
                                as: 'likeComments',
                                attributes: ['user_id'],
                            },
                        ],
                    },
                ],
                order: [['createdAt', 'DESC']],
            });
            return res.status(200).send(postList);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getAllPostMedia = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findAll({ where: { user_id: parseInt(id)} });
        return res.status(200).send(post);
    } catch (error) {
        return res.status(500).send(error.message);
    }   
};

const getDetailPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ['user_name', 'full_name', 'avatar'],
                    include: [
                        {
                            model: Follower,
                            as: 'followings',
                            attributes: ['follower_user_id'],
                        },
                        {
                            model: Story,
                            attributes: ['id', 'story_file', 'createdAt'],
                            order: [['createdAt', 'DESC']],
                            include: [
                                {
                                    model: StoryStatus,
                                    as: 'isSeen',
                                    attributes: ['user_id'],
                                },
                            ],
                        },
                    ],
                },
                {
                    model: Like,
                    as: 'likes',
                    attributes: ['user_id'],
                },
                {
                    model: Comment,
                    as: 'comments',
                    order: [['createdAt', 'DESC']],
                    attributes: ['id', 'user_id', 'comments'],
                    include: [
                        {
                            model: User,
                            attributes: ['user_name', 'full_name', 'avatar'],
                        },
                        {
                            model: LikeComment,
                            as: 'likeComments',
                            attributes: ['user_id'],
                        },
                    ],
                },
            ],
        });
        return res.status(200).send(post);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    getAllPost,
    getDetailPost,
    getAllPostMedia,
};
