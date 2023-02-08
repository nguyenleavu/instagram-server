const express = require('express');
const userRouter = require('./user');
const postRouter = require('./post');
const likeRouter = require('./like');
const commentRouter = require('./comment');
const likeCommentRouter = require('./likeComment');
const storyRouter = require('./story');
const followerRouter = require('./follower');
const recentRouter = require('./recent');
const storyStatusRouter = require('./storyStatus');


const rootRouter = express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/post', postRouter);
rootRouter.use('/like', likeRouter);
rootRouter.use('/comment', commentRouter);
rootRouter.use('/like-comment', likeCommentRouter);
rootRouter.use('/story', storyRouter);
rootRouter.use('/follow', followerRouter);
rootRouter.use('/recent', recentRouter);
rootRouter.use('/seen-story', storyStatusRouter);



module.exports = rootRouter;
