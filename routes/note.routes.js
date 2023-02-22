const express = require("express");
const List = require("../models/List.model");
const router = express.Router();
const Note = require("./../models/Note.model");

router.post("/:listId/notes", (req, res) => {
  const { title, content, isUrgent, dueDate } = req.body
  const { listId } = req.params

  Note.create({ title, content, isUrgent: isUrgent ? true : false, dueDate })
    .then(async (note) => {
      const stuff = await List.findByIdAndUpdate(listId, { $push: { notes: note._id } }, { new: true })
      console.log(listId)
      res.redirect('/')
    })
    .catch((error) => console.log(error));
});

router.get("/:listId/notes", (req, res) => {
  List.find({ owner: req.session.currentUser._id }).populate('notes')
    .then((notes) => res.render('note', { notes }))
    .catch((error) => console.log(error));
});

router.get("/:listId/notes/:noteId", (req, res) => {
  List.findOne({ owner: req.session.currentUser._id, notes: req.params.noteId })
    .then(list => {
      if (!list) {
        return res.status(404).json({ message: 'No note found' })
      }

      return Note.findById(req.params.noteId)
    })
    .then((note) => render({ note }))
    .catch((error) => console.log(error));
});

router.post("/:listId/notes/:noteId", (req, res) => {
  List.findOne({ owner: req.session.currentUser._id, notes: req.params.noteId })
    .then(list => {
      if (!list) {
        return render.status(404).json({ message: 'No note found' })
      }

      return Note.findOneAndUpdate(
        { _id: req.params.noteId },
        req.body,
        { new: true }
      )
    })
    .then((note) => render({ note }))
    .catch((error) => console.log(error));

});
module.exports = router;