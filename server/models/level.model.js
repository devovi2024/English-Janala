const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    level_no: { type: Number, required: true, unique: true },
    lessonName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Level", LevelSchema);
