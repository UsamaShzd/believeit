const mongoose = require("mongoose");

const mileStoneSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  goal: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "goal",
  },

  startDate: { type: Date },

  endDate: {
    type: Date,
  },

  isCompleted: {
    type: Boolean,
    default: false,
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

const Milestone = mongoose.model("milestone", mileStoneSchema);

module.exports = Milestone;
