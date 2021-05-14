const express = require("express");
const _ = require("lodash");

const Milestone = require("../../models/Milestone");

const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");

const {
  createMilestoneSchema,
  editMilestoneSchema,
  changeMilestoneStatusSchema,
} = require("../../validators/milestone");

const { ADMIN } = require("../../enums/roles");
const validateObjectId = require("../../helpers/validateObjectId");

const { getDatesOfRepeatingDays } = require("../../methods/milestone");

const router = express.Router();

router.get("/goal_milestones/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res.status(404).send({ error: { message: "Invalid Goal Id." } });

  const milestones = await Milestone.find({
    goal: id,
  }).sort("startDate");

  res.send(milestones);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res.status(404).send({ error: { message: "Milestone not found!" } });

  const milestone = await Milestone.findById(id);
  if (!milestone)
    return res.status(404).send({ error: { message: "Milestone not found!" } });

  res.send(milestone);
});

router.post(
  "/create_milestone",
  authorize(),
  requestValidator(createMilestoneSchema),
  async (req, res) => {
    const body = _.pick(req.body, [
      "title",
      "goal",
      "frequency",
      "startDate",
      "endDate",
      "repeatingDays",
    ]);

    body.startDate = new Date(body.startDate);
    body.endDate = new Date(body.endDate);

    const { user } = req.authSession;

    const { frequency, repeatingDays, startDate, endDate } = body;

    if (frequency > 1) {
      const repeatingDates = getDatesOfRepeatingDays(
        startDate,
        endDate,
        repeatingDays
      );

      if (frequency < repeatingDates.length)
        return res.status(400).send({
          error: {
            message: "Frequency cannot be greater than repeating days",
          },
        });

      const result = [];
      for (let i = 0; i < repeatingDates.length; ++i) {
        const milestone = await new Milestone({
          ...body,
          startDate: repeatingDates[i],
          endDate: repeatingDates[i],
          createdBy: user._id,
        }).save();
        result.push(milestone);
      }
      res.send(result);
    } else {
      const milestone = await new Milestone({
        ...body,
        createdBy: user._id,
      }).save();
      res.send(milestone);
    }
  }
);

// router.put(
//   "/rearrange",
//   requestValidator(rearrangeSubMilestonesSchema),
//   authorize(),
//   async (req, res) => {
//     const { orderIds } = _.pick(req.body, ["orderIds"]);
//     let sortQueryPromises = orderIds.map((id, index) => {
//       return Milestone.findByIdAndUpdate(id, { sortOrder: index });
//     });
//     await Promise.all(sortQueryPromises);
//     res.send({ message: "Successfully Sorted!" });
//   }
// );

router.put(
  "/change_status/:id",
  requestValidator(changeMilestoneStatusSchema),
  authorize(),
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res
        .status(404)
        .send({ error: { message: "Milestone not found!" } });

    const body = _.pick(req.body, ["isCompleted"]);

    const milestone = await Milestone.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!milestone)
      return res
        .status(404)
        .send({ error: { message: "Milestone not found!" } });

    res.send(milestone);
  }
);

router.put(
  "/:id",
  authorize(ADMIN),
  requestValidator(editMilestoneSchema),
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res
        .status(404)
        .send({ error: { message: "Milestone not found!" } });

    const body = _.pick(req.body, ["title", "startDate", "endDate"]);

    body.startDate = new Date(body.startDate);
    body.endDate = new Date(body.endDate);

    const milestone = await Milestone.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!milestone)
      return res
        .status(404)
        .send({ error: { message: "Milestone not found!" } });

    res.send(milestone);
  }
);

router.delete("/:id", authorize(), async (req, res) => {
  const { id } = req.params;

  if (!validateObjectId(id))
    return res.status(404).send({ error: { message: "Milestone not found!" } });

  const milestone = await Milestone.findByIdAndDelete(id);

  if (!milestone)
    return res.status(404).send({ error: { message: "Milestone not found!" } });

  res.send(milestone);
});

module.exports = router;
