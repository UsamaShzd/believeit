const mongoose = require("mongoose");

const GoalCategory = require("./GoalCategory");
const ImageMedia = require("./media/ImageMedia");
const AudioMedia = require("./media/AudioMedia");
const goalSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  goalCategory: GoalCategory.schema,

  iAm: {
    type: String,
  },

  afterAccomplishment: {
    type: String,
  },

  image: ImageMedia.schema,
  audio: AudioMedia.schema,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model("user", goalSchema);

module.exports = Goal;
