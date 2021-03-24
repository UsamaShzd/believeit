const mongoose = require("mongoose");

const goalCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  color: {
    type: String,
  },
});

const GoalCategory = mongoose.model("goalcategory", goalCategorySchema);

module.exports = GoalCategory;
