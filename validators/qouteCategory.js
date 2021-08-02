const yup = require("yup");

const createQouteCategorySchema = yup.object().shape({
  name: yup.string().trim().min(1).max(100).required(),
  isFree: yup.boolean().required(),
});

module.exports = {
  createQouteCategorySchema,
  editQouteCategorySchema: createQouteCategorySchema,
};
