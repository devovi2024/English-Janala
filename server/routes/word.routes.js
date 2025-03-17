const express = require("express");
const { createWord, getAllWords, getWordById, createWordByLevelNo } = require("../controllers/word.controller");

const router = express.Router();

router.post("/words", createWord);
router.post("/words/levelNo", createWordByLevelNo);  
router.get("/words", getAllWords);
router.get("/words/:id", getWordById);

module.exports = router;
