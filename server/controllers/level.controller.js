const Level = require("../models/level.model");

const createLevel = async (req, res) => {
    try {
        const { level_no, lessonName } = req.body;

        const existingLevel = await Level.findOne({ level_no });
        if (existingLevel) {
            return res.status(400).json({ message: "Level number already exists" });
        }

        const newLevel = new Level({ level_no, lessonName });
        await newLevel.save();

        res.status(201).json(newLevel);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




const getAllLevels = async (req, res) => {
    try {
        const levels = await Level.find();
        res.status(200).json(levels);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const getLevelById = async (req, res) => {
    try {
        const level = await Level.findById(req.params.id);

        if (!level) {
            return res.status(404).json({ message: "Level not found" });
        }

        res.status(200).json(level);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};




module.exports = { createLevel, getAllLevels, getLevelById };
