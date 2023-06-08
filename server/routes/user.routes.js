const express = require("express");
const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

//set a variable that uses Router method
const userRoutes = express.Router();
//api/users/register
userRoutes.post("/register", UserController.registerUser);
//api/users/login
userRoutes.post("/login", UserController.loginUser);
//api/users/
userRoutes.get("/", authenticate, UserController.getAll);
//api/users/:id
userRoutes.get('/:id', authenticate, UserController.getOneUser);
//api/users/logout
userRoutes.delete('/logout', UserController.logout);

module.exports = { userRoutes };
