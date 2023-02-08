const express = require('express');

const {
    createStory,
    getAllStory,
    deleteStory,
    getDetailStory,
} = require('../controllers/story');
const authenticate = require('../middlewares/auth/authenticate');
const checkUploadStory = require('../middlewares/uploads/uploadStory');

const storyRouter = express.Router();

storyRouter.post(
    '/',
    authenticate,
    checkUploadStory('story_file'),
    createStory
);
storyRouter.get('/', authenticate, getAllStory);
storyRouter.delete('/:id', authenticate, deleteStory);
storyRouter.get('/:id', authenticate, getDetailStory);

module.exports = storyRouter;
