const express = require("express");
const { createLevel, getAllLevels, getLevelById } = require("../controllers/level.controller");
const { getWordsByLevel } = require("../controllers/word.controller");

const router = express.Router();

router.post("/levels", createLevel);
router.get("/levels", getAllLevels);
router.get("/levels/:id", getLevelById);
router.get("/words/level/:levelId", getWordsByLevel);


module.exports = router;
