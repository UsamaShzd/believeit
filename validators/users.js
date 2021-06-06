const yup = require("yup");

const updateProfilePicSchema = yup.object().shape({
  image: yup
    .string()
    .required("Image is required")
    .objectId("Invalid Image Id."),
});

const updateLocationSchema = yup.object().shape({
  longitude: yup.number().required(),
  latitude: yup.number().required(),
});

const updateUserDetails = yup.object().shape({
  firstname: yup.string().trim().min(5).max(100).required(),
  lastname: yup.string().trim().min(5).max(100).required(),
});

module.exports = {
  updateProfilePicSchema,
  updateLocationSchema,
  updateUserDetails,
};
