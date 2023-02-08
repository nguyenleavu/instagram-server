const express = require('express');

const { likeComment } = require('../controllers/likeComment');

const authenticate = require('../middlewares/auth/authenticate');

const likeCommentRouter = express.Router();

likeCommentRouter.post('/:id', authenticate, likeComment);

module.exports = likeCommentRouter;
