const mongoose = require('mongoose');
const Schema = mongoose.Schema

const listSchema = new mongoose.Schema ({
    note: { type: mongoose.Schema.Types.ObjectId, ref: 'Note' }

});

const List = mongoose.model('List', listSchema);

module.exports = List;