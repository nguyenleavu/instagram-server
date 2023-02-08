const express = require('express');

const { seenStory } = require('../controllers/storyStatus');
const authenticate = require('../middlewares/auth/authenticate');

const storyStatusRouter = express.Router();

storyStatusRouter.post('/:id', authenticate, seenStory);

module.exports = storyStatusRouter;
