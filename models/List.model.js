const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
        required: true,
        maxLength: 25
    },
    description: {
        type: String,
        maxLength: 300
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

const List = mongoose.model('List', listSchema);

module.exports = List;