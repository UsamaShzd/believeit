const mongoose = require("mongoose");
const Prayer = require("./Prayer");
const Goal = require("./Goal");
const Qoutation = require("./Qoutation");

const scheduledNotificationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "prayer_notification", 
      "e_coaching_notification",
      "affirmation_reminder_notification",
      "motivational_qoute_notification"
    ],
  },

  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  prayer: Prayer.schema,

  goal: Goal.schema,

  qoutation: Qoutation.schema,

  eCoaching: {
    type: String,
  },
  dispatchAt: {
    type: Date,
    required: true,
  },
});

const ScheduledNotification = mongoose.model(
  "schedulednotification",
  scheduledNotificationSchema
);

module.exports = ScheduledNotification;
