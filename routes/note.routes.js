const express = require("express");
const router = express.Router();
const Note = require("./../models/note.model");

router.post("/notes", (req, res) => {
    Note.create(req.body)
      .then((note) => res.json({ data: note }))
      .catch((error) => console.log(error));
  });

  router.get("/notes", (req, res) => {
    Note.find()
      .then((notes) => res.json({ data: notes }))
      .catch((error) => console.log(error));
  });

  router.get("/notes/:noteId", (req, res) => {
    Note.findOne({ _id: req.params.noteId })
      .then((note) => res.json({ data: note }))
      .catch((error) => console.log(error));
  });
  
  router.post("/notes/:noteId", (req, res) => {
    Note.findOneAndUpdate(
      { _id: req.params.noteId },
      req.body,
      { new: true }
    )
      .then((note) => res.json({ data: note }))
      .catch((error) => console.log(error));
  });
  module.exports = router;