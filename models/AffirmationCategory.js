const mongoose = require("mongoose");

const affirmationCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  isFree: {
    type: Boolean,
    default: true,
  },
});

const AffirmationCategory = mongoose.model(
  "affirmationcategory",
  affirmationCategorySchema
);

module.exports = AffirmationCategory;
