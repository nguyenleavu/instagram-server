const { LikeComment } = require('../models');

const likeComment = async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    try {
        const isLike = await LikeComment.findOne({
            where: {
                user_id: parseInt(user.id),
                comment_id: parseInt(id),
            },
        });
        if (!isLike) {
            await LikeComment.create({
                user_id: parseInt(user.id),
                comment_id: parseInt(id),
            });
            res.status(201).send('Liked a comment');
        } else {
            await LikeComment.destroy({
                where: {
                    user_id: parseInt(user.id),
                    comment_id: parseInt(id),
                },
            });
            res.status(201).send('UnLiked a comment');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { likeComment };
