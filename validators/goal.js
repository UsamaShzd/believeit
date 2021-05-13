const yup = require("yup");

exports.createGoalSchema = yup.object().shape({
  title: yup.string().min(5).max(200).required(),
  goalCategory: yup.string().objectId().required(),
  preDefinedGoalRef: yup.string().optional(),
  iAm: yup.string().min(1).max(200).required(),
  accomplishingDate: yup
    .date()
    // .matches(/^\d{2}[./-]\d{2}[./-]\d{4}$/, "Invalid Date")
    .required(),
  afterAccomplishment: yup.string().min(1).max(200).required(),
  importanceOfGoal: yup.string().min(1).max(200).required(),
  // image: yup.string().objectId().required(),
  // audio: yup.string().objectId().required(),
});
