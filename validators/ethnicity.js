const yup = require("yup");

const createEthnicitySchema = yup.object().shape({
  name: yup.string().trim().min(1).max(100).required(),
});

module.exports = {
  createEthnicitySchema,
  editEthnicitySchema: createEthnicitySchema,
};
