const express = require("express");
const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");

const userRoutes = express.Router();

userRoutes.post("/register", UserController.registerUser);
userRoutes.post("/login", UserController.loginUser);
userRoutes.get("/", authenticate, UserController.getAll);
userRoutes.get('/:id', authenticate, UserController.getOneUser);
userRoutes.delete('/logout', UserController.logout);

module.exports = { userRoutes };
