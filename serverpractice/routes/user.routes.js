const express = require('express');

const UserController = require('../controllers/user.controller');

const { authenticate } = require('../config/jwt.config');

const userRoutes = express.Router();

userRoutes.post('/register', UserController.createUser);
userRoutes.post('/login', UserController.loginUser);
userRoutes.get('/', authenticate, UserController.getAllUsers);
userRoutes.delete('/logout', UserController.logout)

module.exports = { userRoutes }