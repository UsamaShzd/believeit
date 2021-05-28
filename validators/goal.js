const yup = require("yup");

const createGoalSchema = yup.object().shape({
  title: yup.string().min(5).max(200).required(),
  goalCategory: yup.string().objectId().required(),
  preDefinedGoalRef: yup.string().optional(),
  iAm: yup.string().min(1).max(200).required(),
  accomplishingDate: yup.date().required(),
  afterAccomplishment: yup.string().min(1).max(200).required(),
  importanceOfGoal: yup.string().min(1).max(200).required(),
  image: yup.string().objectId().required(),
  audio: yup.string().optional(),
  song: yup.string().optional(),
  toPlay: yup.string().min(5).max(200).required(),
  isPublic: yup.boolean().required(),
});

const editGoalSchema = yup.object().shape({
  title: yup.string().min(5).max(200).required(),
  goalCategory: yup.string().objectId().required(),
  preDefinedGoalRef: yup.string().optional(),
  iAm: yup.string().min(1).max(200).required(),
  accomplishingDate: yup.date().required(),
  afterAccomplishment: yup.string().min(1).max(200).required(),
  importanceOfGoal: yup.string().min(1).max(200).required(),
  image: yup.string().objectId().required(),
  audio: yup.string().objectId().required(),
});

const changeGoalStatusSchema = yup.object().shape({
  isCompleted: yup.boolean().required(),
});

//completion
const changeCompletionSchema = yup.object().shape({
  completion: yup.number().min(0).max(100).required(),
});

module.exports = {
  createGoalSchema,
  editGoalSchema,
  changeGoalStatusSchema,
  changeCompletionSchema,
};
