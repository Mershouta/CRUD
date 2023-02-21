const express = require("express");
const List = require("../models/List.model");
const router = express.Router();
const Note = require("./../models/note.model");

router.post("/", (req, res) => {
  const { title, content, isUrgent, dueDate } = req.body
  const { listId } = req.params

  Note.create({ title, content, isUrgent, dueDate })
    .then((note) => {
      List.findByIdAndUpdate(listId, { $push: { notes: note._id } })
      res.json({ note })
    })
    .catch((error) => console.log(error));
});

router.get("/", (req, res) => {
  List.find({ owner: req.session.currentUser._id }).populate('notes')
    .then((notes) => res.json({ data: notes }))
    .catch((error) => console.log(error));
});

router.get("/:noteId", (req, res) => {
  List.findOne({ owner: req.session.currentUser._id, notes: req.params.noteId })
    .then(list => {
      if (!list) {
        return res.status(404).json({ message: 'No note found' })
      }

      return Note.findById(req.params.noteId)
    })
    .then((note) => res.json({ note }))
    .catch((error) => console.log(error));
});

router.post("/:noteId", (req, res) => {
  List.findOne({ owner: req.session.currentUser._id, notes: req.params.noteId })
    .then(list => {
      if (!list) {
        return res.status(404).json({ message: 'No note found' })
      }

      return Note.findOneAndUpdate(
        { _id: req.params.noteId },
        req.body,
        { new: true }
      )
    })
    .then((note) => res.json({ note }))
    .catch((error) => console.log(error));

});
module.exports = router;