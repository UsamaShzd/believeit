const yup = require("yup");

const searchConnectionSchema = yup.object().shape({
  name: yup.string().min(5).max(200).required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

const requestConnectionSchema = yup.object().shape({
  requestedUser: yup.string().objectId().required(),
});

const goalMembershipSchema = yup.object().shape({
  requestedUser: yup.string().objectId().required(),
  goalRef: yup.string().objectId().required(),
});

module.exports = {
  searchConnectionSchema,
  requestConnectionSchema,
  goalMembershipSchema,
};
