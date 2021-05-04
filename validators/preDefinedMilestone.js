const yup = require("yup");

const createPreDefinedMilestoneSchema = yup.object().shape({
  title: yup.string().min(5).max(200).required(),
  frequency: yup.number().min(1).optional(),
  preDefinedGoal: yup.string().objectId().required(),
  repeatingDays: yup.array().of(yup.string().required()).required(),
});

const rearrangeMilestonesSchema = yup.object().shape({
  orderIds: yup.array().of(yup.string().objectId().required()).required(),
});
//isActive
module.exports = {
  createPreDefinedMilestoneSchema,
  editPreDefinedMilestoneSchema: createPreDefinedMilestoneSchema,
  rearrangeMilestonesSchema,
};
