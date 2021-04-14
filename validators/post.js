const yup = require("yup");

const createPostSchema = yup.object().shape({
  type: yup.string().trim().required(),
  title: yup.string().trim().min(5).max(150).required(),
  youtubeVideo: yup.string().when("type", {
    is: "youtube_video",
    then: yup.string().required(),
  }),

  htmlContent: yup.string().when("type", {
    is: "blog",
    then: yup.string().required(),
  }),
});

module.exports = {
  createPostSchema,
  editPostSchema: createPostSchema,
};
