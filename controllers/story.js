const { Op } = require('sequelize');
const { Story, StoryStatus, User, sequelize } = require('../models');

const createStory = async (req, res) => {
    const { user, file } = req;
    try {
        if (!file) {
            return res.status(400).send({
                message: 'Upload file again!',
            });
        } else {
            // url story_file
            const storyUrl = `http://localhost:4000/${file.path}`;

            const newStory = await Story.create({
                user_id: user.id,
                story_file: storyUrl,
            });
            return res.status(201).send(newStory);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getAllStory = async (req, res) => {
    const { user } = req;
    await sequelize.query(`set global sql_mode = ''`);
    try {
        const storyList = await Story.findAll({
            attributes: ['user_id', 'createdAt', 'id'],
            include: [
                {
                    model: StoryStatus,
                    as: 'isSeen',
                    attributes: ['user_id'],
                },
                {
                    model: User,
                    attributes: ['user_name', 'avatar'],
                    include: [
                        {
                            model: Story,
                            attributes: ['id', 'story_file', 'createdAt'],
                            order: [['createdAt', 'DESC']],
                        },
                    ],
                },
            ],
            where: { user_id: { [Op.not]: user.id } },
            group: 'user_id',
            limit: 20,
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).send(storyList);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getDetailStory = async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    try {
        const storyList = await Story.findOne({
            attributes: ['user_id', 'createdAt'],
            include: [
                {
                    model: StoryStatus,
                    as: 'isSeen',
                    attributes: ['user_id'],
                },
                {
                    model: User,
                    attributes: ['user_name', 'avatar'],
                    include: [
                        {
                            model: Story,
                            attributes: ['id', 'story_file', 'createdAt'],
                            order: [['createdAt', 'DESC']],
                        },
                    ],
                },
            ],
            where: { user_id: id },
            group: 'user_id',
            limit: 20,
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).send(storyList);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const deleteStory = async (req, res) => {
    try {
        const { id } = req.params;

        const story = await Story.findByPk(id);

        if (!story) {
            return res.status(404).send({ message: 'Story not found!' });
        }
        await Story.destroy({ where: { id } });
        return res.status(200).send('Deleted success!');
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = { createStory, getAllStory, deleteStory, getDetailStory };
