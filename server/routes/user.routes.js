const express = require('express');
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

const userRoutes = express.Router();


module.exports = app => {
    userRoutes.post('/api/register', UserController.register);
    userRoutes.post('/api/login', UserController.login);
    userRoutes.post('/api/users', authenticate, UserController.getAll);

}

module.exports = { userRoutes }