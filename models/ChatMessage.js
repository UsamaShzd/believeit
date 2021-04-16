const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  sender: {
    type: Schema.ObjectId,
    ref: "user",
  },
  isDirectMessage: Boolean,
  chatRoomRef: {
    type: Schema.ObjectId,
    ref: "chatrooms",
    required: true,
  },
  recipient: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
  content: {
    message: String,
    tags: [
      {
        startIndex: Number,
        endIndex: Number,
        user: {
          type: Schema.ObjectId,
          ref: "user",
        },
      },
    ],
  },

  customIdentifier: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model("chatmessages", chatMessageSchema);
module.exports = ChatMessage;
