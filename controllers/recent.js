const { Recent, User } = require('../models');

const addRecent = async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    try {
        const currentRecent = await Recent.findOne({
            where: { user_id: user.id, recent_user_id: parseInt(id) },
        });

        if (currentRecent) {
            await Recent.destroy({
                where: { user_id: user.id, recent_user_id: parseInt(id) },
            });
        }

        const newRecent = await Recent.create({
            user_id: user.id,
            recent_user_id: parseInt(id),
        });
        return res.status(201).send(newRecent);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteRecent = async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    try {
        const isRecent = await Recent.findOne({
            where: {
                user_id: user.id,
                recent_user_id: parseInt(id),
            },
        });

        if (isRecent) {
            await Recent.destroy({
                where: { user_id: user.id, recent_user_id: parseInt(id) },
            });
            return res.status(200).send('Delete Success!');
        } else {
            return res.status(404).send('Not Found');
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getAllRecent = async (req, res) => {
    const { user } = req;
    try {
        const recentList = await Recent.findAll({
            include: [
                {
                    model: User,
                    as: 'recent_user',
                    attributes: [
                        'id',
                        'avatar',
                        'user_name',
                        'full_name',
                        'tick',
                    ],
                },
            ],
            where: { user_id: user.id },
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).send(recentList);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const deleteAllRecent = async (req, res) => {
    const { user } = req;
    try {
        await Recent.destroy({
            where: { user_id: user.id },
            truncate: true,
        });
        return res.status(200).send('Delete Success!');
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = {
    addRecent,
    deleteRecent,
    getAllRecent,
    deleteAllRecent,
};
