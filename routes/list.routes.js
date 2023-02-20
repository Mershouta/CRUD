const express = require("express");
const router = express.Router();
const List = require("./../models/List.model");
const Note = require("./../models/Note.model");

router.post("/list", (req, res) => {
    const { note } = req.body;
    
    List.create({ note: note._id })
      .then((createdNote) => res.json({ data: createdNote }))
      .catch((error) => console.log(error));
  });
  
  
  // GET /purchases/:purchaseId - you will use .populate() here
  router.get("/list/:listId", (req, res) => {
    
    Purchase.findById(req.params.listId)
      .populate("note")
      .then((populatedList) => res.json({ data: populatedList }))
      .catch((error) => console.log(error));
  });

module.exports = router;