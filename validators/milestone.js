const yup = require("yup");

const createMilestoneSchema = yup.object().shape({
  title: yup.string().trim().min(1).max(500).required(),
  goal: yup.string().objectId().required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
  frequency: yup.number().min(1).max(100).required(),
  repeatingDays: yup.array().of(yup.string().required()).required(),
});

const editMilestoneSchema = yup.object().shape({
  title: yup.string().trim().min(1).max(500).required(),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

const changeMilestoneStatusSchema = yup.object().shape({
  isCompleted: yup.boolean().required(),
});

module.exports = {
  createMilestoneSchema,
  changeMilestoneStatusSchema,
  editMilestoneSchema,
};
