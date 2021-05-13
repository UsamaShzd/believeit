const mongoose = require("mongoose");

const mileStoneSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },

  milestone: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "milestone",
  },

  goal: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "goal",
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: false,
  },

  sortOrder: {
    type: Number,
    default: 0,
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

const SubMilestone = mongoose.model("submilestone", mileStoneSchema);

module.exports = SubMilestone;
