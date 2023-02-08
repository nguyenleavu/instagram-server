const { Follower } = require('../models');

const followUser = async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    try {
        const isFollowed = await Follower.findOne({
            where: {
                follower_user_id: user.id,
                following_user_id: parseInt(id),
            },
        });

        if (!isFollowed) {
            await Follower.create({
                follower_user_id: user.id,
                following_user_id: parseInt(id),
            });

            return res.status(201).send(`Following user have id : ${id}`);
        }

        if (isFollowed) {
            await Follower.destroy({
                where: {
                    follower_user_id: user.id,
                    following_user_id: parseInt(id),
                },
            });

            return res.status(200).send('UnFollowing user have id : ' + id);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = {
    followUser,
};
