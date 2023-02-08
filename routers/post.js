const express = require('express');
const {
    createPost,
    updatePost,
    deletePost,
    getAllPost,
    getDetailPost,
    getAllPostMedia,
} = require('../controllers/post');
const checkUploadPhotos = require('../middlewares/uploads/uploadPostPhotos');
const authenticate = require('../middlewares/auth/authenticate');

const postRouter = express.Router();

postRouter.post('/', authenticate, checkUploadPhotos('media_file'), createPost);
postRouter.get('/', authenticate, getAllPost);
postRouter.get('/:id', authenticate, getDetailPost);
postRouter.get('/media/:id', getAllPostMedia);
postRouter.put('/:id', authenticate, updatePost);
postRouter.delete('/:id', authenticate, deletePost);
postRouter.delete('/:id', authenticate, deletePost);

module.exports = postRouter;
