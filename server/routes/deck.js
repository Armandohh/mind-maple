const express = require('express');
const router = express.Router();
const { Decks } = require("../models");

//route to get all the decks
router.get("/", async (req, res) => {
    const decks = await Decks.findAll();
    res.json(decks);
});

//route to create a new deck
router.post("/", async (req, res) => {
    const deck = req.body;
    await Decks.create(deck);
    res.json(deck);
})

module.exports = router;