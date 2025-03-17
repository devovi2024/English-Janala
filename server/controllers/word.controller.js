const Word = require("../models/word.model");
const Level = require("../models/level.model");
const mongoose = require("mongoose");

const createWord = async (req, res) => {
    try {
        const { word, meaning, pronunciation, sentence = "", partsOfSpeech, level, synonyms = [], points = 0 } = req.body;

        if (!level) {
            return res.status(400).json({ message: "Level ID is required." });
        }

    
        if (!mongoose.Types.ObjectId.isValid(level)) {
            return res.status(400).json({ message: "Invalid Level ID format." });
        }

        const existingLevel = await Level.findById(level);
        if (!existingLevel) {
            return res.status(404).json({ message: "Level not found." });
        }


        const newWord = await Word.create({
            word,
            meaning,
            pronunciation,
            sentence,
            partsOfSpeech,
            level,
            synonyms,
            points
        });

        res.status(201).json({ message: "Word created successfully", word: newWord });
    } catch (error) {
        console.error("Error creating word:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const createWordByLevelNo = async (req, res) => {
    try {
        const { word, meaning, pronunciation, sentence = "", partsOfSpeech, level_no, synonyms = [], points = 0 } = req.body;

        if (!level_no) {
            return res.status(400).json({ message: "Level number is required." });
        }


        const existingLevel = await Level.findOne({ level_no });
        if (!existingLevel) {
            return res.status(404).json({ message: "Invalid Level No! Please enter a valid Level." });
        }


        const newWord = await Word.create({
            word,
            meaning,
            pronunciation,
            sentence,
            partsOfSpeech,
            level: existingLevel._id,
            synonyms,
            points
        });

        res.status(201).json({ message: "Word created successfully", word: newWord });
    } catch (error) {
        console.error("Error creating word:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getAllWords = async (req, res) => {
    try {
        const words = await Word.find().populate("level", "level_no lessonName");
        res.status(200).json(words);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getWordById = async (req, res) => {
    try {
        const word = await Word.findById(req.params.id).populate("level");

        if (!word) {
            return res.status(404).json({ message: "Word not found" });
        }

        res.status(200).json(word);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getWordsByLevel = async (req, res) => {
    try {
        const words = await Word.find({ level: req.params.levelId }).populate("level");
        res.status(200).json(words);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createWord, getAllWords, getWordById, getWordsByLevel, createWordByLevelNo };



