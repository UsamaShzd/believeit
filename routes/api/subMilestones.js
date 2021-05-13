const express = require("express");
const _ = require("lodash");

const SubMilestone = require("../../models/SubMilestone");

const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");

const {
  createSubMilestoneSchema,
  editSubMilestoneSchema,
  changeSubMilestoneStatusSchema,
  rearrangeSubMilestonesSchema,
} = require("../../validators/subMilestone");

const { ADMIN } = require("../../enums/roles");
const validateObjectId = require("../../helpers/validateObjectId");

const { getDatesOfRepeatingDays } = require("../../methods/milestone");

const router = express.Router();

router.get("/list/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Invalid Milestone Id." } });

  const milestones = await SubMilestone.find({
    milestone: id,
  });

  res.send(milestones);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Sub Milestone not found!" } });

  const milestone = await SubMilestone.findById(id);

  if (!milestone)
    return res
      .status(404)
      .send({ error: { message: "Sub Milestone not found!" } });

  res.send(milestone);
});

router.post(
  "/",
  requestValidator(createSubMilestoneSchema),
  authorize(),
  async (req, res) => {
    const body = _.pick(req.body, ["title", "milestone"]);

    const { user } = req.authSession;

    const milestone = await new SubMilestone({
      ...body,
      createdBy: user._id,
    }).save();
    res.send(milestone);
  }
);

router.put(
  "/rearrange",
  requestValidator(rearrangeSubMilestonesSchema),
  authorize(),
  async (req, res) => {
    const { orderIds } = _.pick(req.body, ["orderIds"]);
    let sortQueryPromises = orderIds.map((id, index) => {
      return SubMilestone.findByIdAndUpdate(id, { sortOrder: index });
    });
    await Promise.all(sortQueryPromises);
    res.send({ message: "Successfully Sorted!" });
  }
);

router.put(
  "/change_status/:id",
  requestValidator(changeSubMilestoneStatusSchema),
  authorize(),
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res.status(404).send({
        error: { message: "Sub Milestone not found!" },
      });

    const body = _.pick(req.body, ["isCompleted"]);

    const milestone = await SubMilestone.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!milestone)
      return res.status(404).send({
        error: { message: "Sub Milestone not found!" },
      });

    res.send(milestone);
  }
);

router.put(
  "/:id",
  authorize(ADMIN),
  requestValidator(editSubMilestoneSchema),
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res
        .status(404)
        .send({ error: { message: "Sub Milestone not found!" } });

    const body = _.pick(req.body, ["title"]);

    const milestone = await SubMilestone.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!milestone)
      return res
        .status(404)
        .send({ error: { message: "Sub Milestone not found!" } });

    res.send(milestone);
  }
);

router.delete("/:id", authorize(), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res
      .status(404)
      .send({ error: { message: "Sub Milestone not found!" } });

  const milestone = await SubMilestone.findByIdAndDelete(id);

  if (!milestone)
    return res
      .status(404)
      .send({ error: { message: "Sub Milestone not found!" } });

  res.send(milestone);
});

module.exports = router;
