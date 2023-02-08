const express = require('express');
const {
    register,
    login,
    uploadAvatar,
    searchUser,
    getDetailUser,
    updateUser,
    getSuggestedUserList,
} = require('../controllers/user');
const authenticate = require('../middlewares/auth/authenticate');
const checkUploadAvatar = require('../middlewares/uploads/uploadAvatar');
const checkEmail = require('../middlewares/validations/checkEmail');
const checkPhone = require('../middlewares/validations/checkPhone');
const checkUsername = require('../middlewares/validations/checkUsername');

const userRouter = express.Router();

userRouter.post('/register', checkEmail, checkPhone, checkUsername, register);
userRouter.post('/login', login);
userRouter.post(
    '/upload-avatar',
    authenticate,
    checkUploadAvatar('avatar'),
    uploadAvatar
);
userRouter.get('/search', authenticate, searchUser);
userRouter.get('/suggested', authenticate, getSuggestedUserList);
userRouter.get('/:user_name', getDetailUser);
userRouter.put('/update-user', authenticate, updateUser);

module.exports = userRouter;
