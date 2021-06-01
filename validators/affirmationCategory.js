const yup = require("yup");

const createAffirmationCategorySchema = yup.object().shape({
  name: yup.string().trim().min(3).max(100).required(),
  isFree: yup.boolean().required(),
});

module.exports = {
  createAffirmationCategorySchema: createAffirmationCategorySchema,
  editAffirmationCategorySchema: createAffirmationCategorySchema,
};
