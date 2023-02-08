const express = require('express');

const { followUser } = require('../controllers/follower');
const authenticate = require('../middlewares/auth/authenticate');

const followerRouter = express.Router();

followerRouter.post('/:id',authenticate, followUser);

module.exports = followerRouter;
