const { Comment, sequelize } = require('../models');

const createComment = async (req, res) => {
    const { user } = req;
    const { comments } = req.body;
    const { id } = req.params;

    try {
        const newComment = await Comment.create({
            user_id: parseInt(user.id),
            post_id: parseInt(id),
            comments,
        });
        return res.status(201).send(newComment);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const updateComment = async (req, res) => {
    const { id } = req.params;
    const { comments } = req.body;

    try {
        const currentComment = await Comment.findOne({ where: { id } });

        if (currentComment) {
            currentComment.comments = comments;
            await currentComment.save();
            return res.status(200).send(currentComment);
        } else {
            return res.status(404).send('Comment not found');
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

const deleteComment = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const userId = parseInt(user.id);
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    try {
        const currentComment = await Comment.findOne({ where: { id } });

        // check user
        if (userId === currentComment.user_id) {
            await currentComment.destroy({ where: { id } });
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
            return res.status(200).send('Comment deleted');
        } else {
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
            return res
                .status(401)
                .send('You do not have permission to delete this comment');
        }
    } catch (error) {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        return res.status(500).send(error);
    }
};

const getAllComment = async (req, res) => {
    try {
        const commentList = await Comment.findAll({
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).send(commentList);
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = { createComment, updateComment, deleteComment, getAllComment };
