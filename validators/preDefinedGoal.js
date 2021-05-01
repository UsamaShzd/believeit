const yup = require("yup");

const createPreDefinedGoalSchema = yup.object().shape({
  title: yup.string().min(5).max(200).required(),
  goalCategory: yup.string().objectId().required(),
});

const editPreDefinedGoalSchema = yup.object().shape({
  title: yup.string().min(5).max(200).required(),
  goalCategory: yup.string().objectId().required(),
  isActive: yup.boolean().optional(),
});
//isActive
module.exports = {
  createPreDefinedGoalSchema,
  editPreDefinedGoalSchema,
};
