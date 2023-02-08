const { Like } = require('../models');

const like = async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    try {
        const isLike = await Like.findOne({
            where: {
                user_id: parseInt(user.id),
                post_id: parseInt(id),
            },
        });
        if (!isLike) {
            await Like.create({
                user_id: parseInt(user.id),
                post_id: parseInt(id),
            });
            res.status(201).send('Liked');
        } else {
            await Like.destroy({
                where: {
                    user_id: parseInt(user.id),
                    post_id: parseInt(id),
                },
            });
            res.status(201).send('UnLiked');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { like };
