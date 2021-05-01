const mongoose = require("mongoose");

const mileStoneSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

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

const Milestone = mongoose.model("predefinedmilestone", mileStoneSchema);

module.exports = Milestone;
