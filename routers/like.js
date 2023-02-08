const express = require('express');

const { like, unLike } = require('../controllers/like');
const authenticate = require('../middlewares/auth/authenticate');

const likeRouter = express.Router();

likeRouter.post('/:id', authenticate, like);

module.exports = likeRouter;
