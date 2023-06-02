const express = require("express");
const NoteController = require("../controllers/note.controller");
const { authenticate } = require("../config/jwt.config");

const noteRoutes = express.Router();

noteRoutes.post("/:id", authenticate, NoteController.postNote);
// noteRoutes.post("/login", NoteController.loginUser);
// noteRoutes.get("/", authenticate, NoteController.getAll);
// noteRoutes.delete('/logout', NoteController.logout)

module.exports = { noteRoutes };
