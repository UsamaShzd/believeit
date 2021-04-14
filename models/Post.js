const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },

  type: {
    type: String,
    enum: ["youtube_video", "blog"],
    default: "youtube_video",
  },

  youtubeVideo: {
    type: String,
  },

  htmlContent: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
