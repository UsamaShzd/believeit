const express = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");
const Qoutation = require("../../models/Qoutation");
const QouteCategory = require("../../models/QouteCategory");

const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");
const {
  createQoutationSchema,
  editQoutationSchema,
} = require("../../validators/qoutation");

const { ADMIN } = require("../../enums/roles");
const validateObjectId = require("../../helpers/validateObjectId");
const router = express.Router();

router.get("/random_qoutation/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res.status(404).send({ error: { message: "Qoute not found!" } });

  const qoute = await Qoutation.aggregate([
    { $match: { "category._id": mongoose.Types.ObjectId(id) } },
    { $sample: { size: 1 } },
  ]);

  if (qoute.length === 0)
    return res.status(404).send({ error: { message: "Qoute not found!" } });

  res.send(qoute[0]);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res.status(404).send({ error: { message: "Qoute not found!" } });

  const qoute = await Qoutation.findById(id);
  if (!qoute)
    return res.status(404).send({ error: { message: "Qoute not found!" } });

  res.send(qoute);
});

router.get("/", async (req, res) => {
  const qoutations = await Qoutation.find();
  res.send(qoutations);
});

router.post(
  "/",
  authorize(ADMIN),
  requestValidator(createQoutationSchema),
  async (req, res) => {
    const body = _.pick(req.body, ["qoutation", "category"]);

    const category = await QouteCategory.findById(body.category);

    if (!category)
      return res.status(400).send({
        error: {
          category: "Invalid Category",
        },
      });

    body.category = category;
    const qoute = await new Qoutation(body).save();
    res.send(qoute);
  }
);

router.put(
  "/:id",
  authorize(ADMIN),
  requestValidator(editQoutationSchema),
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res.status(404).send({ error: { message: "Qoute not found!" } });

    const body = _.pick(req.body, ["qoutation", "category"]);

    const category = await QouteCategory.findById(body.category);

    if (!category)
      return res.status(400).send({
        error: {
          category: "Invalid Category",
        },
      });
    body.category = category;

    const qoute = await Qoutation.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!qoute)
      return res.status(404).send({ error: { message: "Qoute not found!" } });

    res.send(qoute);
  }
);

router.delete("/:id", authorize(ADMIN), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res.status(404).send({ error: { message: "Qoute not found!" } });

  const qoute = await Qoutation.findByIdAndDelete(id);

  if (!qoute)
    return res.status(404).send({ error: { message: "Qoute not found!" } });

  res.send(qoute);
});

module.exports = router;
