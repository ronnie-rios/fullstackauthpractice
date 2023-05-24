const express = require('express');
const UserController = require('../controllers/user.controller');

const userRoutes = express.Router();

module.exports = { userRoutes }