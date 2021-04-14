const express = require("express");
const _ = require("lodash");

const Post = require("../../models/Post");

const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");
const { createPostSchema, editPostSchema } = require("../../validators/post");

const { ADMIN } = require("../../enums/roles");
const validateObjectId = require("../../helpers/validateObjectId");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res.status(404).send({ error: { message: "Post not found!" } });

  const post = await Post.findById(id);
  if (!post)
    return res.status(404).send({ error: { message: "Post not found!" } });

  res.send(post);
});

router.get("/", async (req, res) => {
  const posts = await Post.find().sort("name");
  res.send(posts);
});

router.post(
  "/",
  authorize(ADMIN),
  requestValidator(createPostSchema),
  async (req, res) => {
    const body = _.pick(req.body, [
      "type",
      "title",
      "youtubeVideo",
      "htmlContent",
    ]);

    const post = await new Post(body).save();
    res.send(post);
  }
);

router.put(
  "/:id",
  authorize(ADMIN),
  requestValidator(editPostSchema),
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res.status(404).send({ error: { message: "Post not found!" } });

    const body = _.pick(req.body, [
      "type",
      "title",
      "youtubeVideo",
      "htmlContent",
    ]);

    const post = await Post.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!post)
      return res.status(404).send({ error: { message: "Post not found!" } });

    res.send(post);
  }
);

router.delete("/:id", authorize(ADMIN), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res.status(404).send({ error: { message: "Post not found!" } });

  const post = await Post.findByIdAndDelete(id);

  if (!post)
    return res.status(404).send({ error: { message: "Post not found!" } });

  res.send(post);
});

module.exports = router;
