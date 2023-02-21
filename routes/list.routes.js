const express = require("express");
const router = express.Router();
const List = require("./../models/List.model");
const Note = require("./../models/Note.model");

router.post("/", (req, res) => {
  const { title, description } = req.body;
  const owner = req.session.currentUser;

  List.create({ title, description, owner })
    .then((createdList) => res.json(createdList))
    .catch((error) => console.log(error));
});

router.get("/", (req, res) => {
  List.find({ owner: req.session.currentUser._id }).populate('lists')
    .then((lists) => res.json({ lists }))
    .catch((error) => console.log(error));
});

router.get("/:listId", (req, res) => {
  const owner = req.session.currentUser._id

  List.findOne({ _id: req.params.listId, owner })
    .then((list) => res.json(list))
    .catch((error) => console.log(error));
});

router.use("/:listId/notes", require("./note.routes"))

module.exports = router;