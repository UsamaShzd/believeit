const yup = require("yup");

const searchConnectionSchema = yup.object().shape({
  name: yup.string().min(5).max(200).required(),
  latitude: yup.string().min(5).max(200).required(),
  longitude: yup.string().min(5).max(200).required(),
});

const requestConnectionSchema = yup.object().shape({
  requestedUser: yup.string().objectId().required(),
});
module.exports = {
  searchConnectionSchema,
  requestConnectionSchema,
};
