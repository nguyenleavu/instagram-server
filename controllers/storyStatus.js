const { StoryStatus } = require('../models');

const seenStory = async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    try {
        const isSeen = await StoryStatus.findOne({
            where: {
                user_id: parseInt(user.id),
                story_id: parseInt(id),
            },
        });

        if (!isSeen) {
            await StoryStatus.create({
                user_id: parseInt(user.id),
                story_id: parseInt(id),
            });
            return res.status(201).send('Seen success!');
        } else {
            return res.status(200).send('You are already seen!');
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports = { seenStory };
