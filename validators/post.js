const yup = require("yup");

const createPostSchema = yup.object().shape({
  type: yup.string().trim().required(),
  title: yup.string().trim().min(5).max(150).required(),
  youtubeVideo: yup.string().when("type", {
    is: "youtube_video",
    then: yup.string().required(),
  }),

  image: yup.string().when("type", {
    is: "blog",
    then: yup.string().objectId().required(),
  }),

  description: yup.string().when("type", {
    is: "blog",
    then: yup.string().min(5).max(500).required(),
  }),

  htmlContent: yup.string().when("type", {
    is: "blog",
    then: yup.string().trim().min(1).max(5000).required(),
  }),
});

const editPostSchema = yup.object().shape({
  type: yup.string().trim().required(),
  title: yup.string().trim().min(5).max(150).required(),
  youtubeVideo: yup.string().when("type", {
    is: "youtube_video",
    then: yup.string().required(),
  }),

  image: yup.string().when("type", {
    is: "blog",
    then: yup.string().optional(),
  }),

  description: yup.string().when("type", {
    is: "blog",
    then: yup.string().min(5).max(500).required(),
  }),

  htmlContent: yup.string().when("type", {
    is: "blog",
    then: yup.string().trim().min(1).max(5000).required(),
  }),
});

module.exports = {
  createPostSchema,
  editPostSchema,
};
