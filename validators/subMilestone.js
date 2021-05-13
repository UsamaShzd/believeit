const yup = require("yup");

const createSubMilestoneSchema = yup.object().shape({
  title: yup.string().trim().min(1).max(500).required(),
  milestone: yup.string().objectId().required(),
});

const editSubMilestoneSchema = yup.object().shape({
  title: yup.string().trim().min(1).max(500).required(),
});

const changeSubMilestoneStatusSchema = yup.object().shape({
  isCompleted: yup.boolean().required(),
});
const rearrangeSubMilestonesSchema = yup.object().shape({
  orderIds: yup.array().of(yup.string().objectId().required()).required(),
});

module.exports = {
  createSubMilestoneSchema,
  changeSubMilestoneStatusSchema,
  editSubMilestoneSchema,
  rearrangeSubMilestonesSchema,
};
