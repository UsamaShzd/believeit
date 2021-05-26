const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["goal_membership_request"],
  },

  seen: {
    type: Boolean,
    default: false,
  },

  isOpened: {
    type: Boolean,
    default: false,
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "user",
  },

  goalMembeship: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "goal",
  },

  connection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "connection",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("notification", notificationSchema);

module.exports = Notification;
