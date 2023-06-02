const User = require("../models/user.model");
const Note = require("../models/notes.model");

const postNote = async (req, res) => {
  try {
    const newNote = await Note.create(req.body);
  
    const foundUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { notes: newNote._id } },
      { new: true }
    );
   
    res.json(foundUser);
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};


module.exports = {
    postNote
}