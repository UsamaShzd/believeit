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

module.exports = {
  updateProfilePicSchema,
  updateLocationSchema,
};
