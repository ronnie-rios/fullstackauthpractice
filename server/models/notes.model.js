const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        minLength: [3, 'Title must be longer than 3 characters']
    },
    body: {
        type: String,
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
