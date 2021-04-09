const yup = require("yup");

exports.createGoalSchema = yup.object().shape({
  objectId: yup.string().objectId().required(),
});
