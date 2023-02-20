const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new mongoose.Schema ({
    title: String,
    description: String,
    priority: Boolean,
    dueDate: Date,
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;