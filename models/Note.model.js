const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 25
    },
    content: {
        type: String,
        required: true,
        maxLength: 300
    },
    isUrgent: {
        type: Boolean,
        default: false
    },
    dueDate: Date
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;