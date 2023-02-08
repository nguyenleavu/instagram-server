const express = require('express');
const {
    addRecent,
    deleteRecent,
    getAllRecent,
    deleteAllRecent,
} = require('../controllers/recent');
const authenticate = require('../middlewares/auth/authenticate');

const recentRouter = express.Router();

recentRouter.post('/:id', authenticate, addRecent);
recentRouter.delete('/:id', authenticate, deleteRecent);
recentRouter.get('/', authenticate, getAllRecent);
recentRouter.delete('/', authenticate, deleteAllRecent);

module.exports = recentRouter;
