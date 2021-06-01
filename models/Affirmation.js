const mongoose = require("mongoose");
const AffirmationCategory = require("./AffirmationCategory");

const affirmationSchema = new mongoose.Schema({
  affirmation: {
    type: String,
    trim: true,
  },
  category: {
    type: AffirmationCategory.schema,
  },
});

const Affirmation = mongoose.model("affirmation", affirmationSchema);

module.exports = Affirmation;
