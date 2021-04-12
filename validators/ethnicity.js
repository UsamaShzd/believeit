const yup = require("yup");

const createEthnicitySchema = yup.object().shape({
  name: yup.string().trim().min(3).max(100).required(),
});

module.exports = {
  createEthnicitySchema,
  editEthnicitySchema: createEthnicitySchema,
};
