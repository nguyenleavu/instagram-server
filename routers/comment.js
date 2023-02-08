const express = require('express');

const {
    createComment,
    updateComment,
    deleteComment,
    getAllComment,
} = require('../controllers/comment');
const authenticate = require('../middlewares/auth/authenticate');

const commentRouter = express.Router();

commentRouter.post('/:id/post', authenticate, createComment);
commentRouter.put('/:id', authenticate, updateComment);
commentRouter.delete('/:id', authenticate, deleteComment);
commentRouter.get('/', authenticate, getAllComment);

module.exports = commentRouter;
