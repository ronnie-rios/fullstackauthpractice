const User = require('../models/user.model');
const Note = require('../models/notes.model');

const postNote = async (req,res) => {
    const newNote = await Note.create(req.body);
   
}