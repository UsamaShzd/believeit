const express = require("express");
const _ = require("lodash");

const QouteCategory = require("../../models/QouteCategory");

const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");
const {
  createQouteCategorySchema,
  editQouteCategorySchema,
} = require("../../validators/qouteCategory");

const { ADMIN } = require("../../enums/roles");
const validateObjectId = require("../../helpers/validateObjectId");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Qoute Category not found!" } });

  const category = await QouteCategory.findById(id);
  if (!category)
    return res
      .status(404)
      .send({ error: { message: "Qoute Category not found!" } });

  res.send(category);
});

router.get("/", async (req, res) => {
  const categories = await QouteCategory.find().sort("name");
  res.send(categories);
});

router.post(
  "/",
  authorize(ADMIN),
  requestValidator(createQouteCategorySchema),
  async (req, res) => {
    const body = _.pick(req.body, ["name", "isFree"]);

    const category = await new QouteCategory(body).save();
    res.send(category);
  }
);

router.put(
  "/:id",
  authorize(ADMIN),
  requestValidator(editQouteCategorySchema),
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res
        .status(404)
        .send({ error: { message: "Qoute Category not found!" } });

    const body = _.pick(req.body, ["name", "isFree"]);

    const category = await QouteCategory.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!category)
      return res
        .status(404)
        .send({ error: { message: "Qoute Category not found!" } });

    res.send(category);
  }
);

router.delete("/:id", authorize(ADMIN), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Qoute Category not found!" } });

  const category = await QouteCategory.findByIdAndDelete(id);

  if (!category)
    return res
      .status(404)
      .send({ error: { message: "Qoute Category not found!" } });

  res.send(category);
});

module.exports = router;
