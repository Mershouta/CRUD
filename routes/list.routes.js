const express = require("express");
const router = express.Router();
const List = require("./../models/List.model");
const Note = require("./../models/Note.model");

router.post("/", (req, res) => {
  const { title, description } = req.body;
  const owner = req.session.currentUser._id;


  List.create({ title, description, owner })
    .then((createdList) => res.redirect('/lists'))
    .catch((error) => console.log(error));
});

router.get("/", (req, res) => {
  List.find({ owner: req.session.currentUser._id }).populate('notes')
    .then((lists) => res.render('lists', { lists }))
    .catch((error) => console.log(error));
});

router.get("/:listId", (req, res) => {
  const owner = req.session.currentUser._id
  if (!req.params.listId) {
    return res.redirect('/lists')
  }
  List.findOne({ _id: req.params.listId, owner: req.session.currentUser._id }).populate('notes')
    .then((list) => res.render('oneList', { list }))
    .catch((error) => console.log(error));
});

router.use("/", require("./note.routes"))

module.exports = router;