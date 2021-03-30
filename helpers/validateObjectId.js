const mongoose = require("mongoose");
module.exports = (id) => {
  if (id.length !== 24) return false;
  return mongoose.Types.ObjectId.isValid(id);
};
