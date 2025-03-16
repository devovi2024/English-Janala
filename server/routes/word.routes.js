const express = require("express");
const { createWord, getAllWords, getWordById } = require("../controllers/word.controller");

const router = express.Router();

router.post("/words", createWord);
router.get("/words", getAllWords);
router.get("/words/:id", getWordById);

module.exports = router;
