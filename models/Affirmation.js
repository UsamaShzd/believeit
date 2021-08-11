const mongoose = require("mongoose");
const AffirmationSubCategory = require("./AffirmationSubCategory");

const affirmationSchema = new mongoose.Schema({
  affirmation: {
    type: String,
    trim: true,
  },
  category: {
    type: AffirmationSubCategory.schema,
  },
});

const Affirmation = mongoose.model("affirmation", affirmationSchema);

module.exports = Affirmation;
