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
      res.redirect(`/lists/${listId}`)
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
    .then((note) => res.render("editNote", { note, listId: req.params.listId }))
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
        { ...req.body, isUrgent: req.body.isUrgent ? true : false },
        { new: true }
      )
    })
    .then((note) => res.redirect(`/lists/${req.params.listId}`))
    .catch((error) => console.log(error));

});

router.post('/:listId/notes/:noteId/delete', async (req, res) => {
  console.log("DELETE review", req.params.noteId)
  await Note.deleteOne({ _id: req.params.noteId })
    .catch((err) => {
      console.log(err.message);
    })
  res.redirect(`/lists/${req.params.listId}`)
})
module.exports = router;