const express = require("express");
const _ = require("lodash");

const GoalCategory = require("../../models/GoalCategory");
const Goal = require("../../models/Goal");
const Milestone = require("../../models/Milestone");
const SubMilestone = require("../../models/SubMilestone");
const PreDefinedGoal = require("../../models/PreDefinedGoal");
const PreDefinedMilestone = require("../../models/PreDefinedMilestone");
const PreDefinedSubMilestone = require("../../models/PreDefinedSubMilestone");

const validateObjectId = require("../../helpers/validateObjectId");

const authorize = require("../../middlewares/authorize");
const requestValidator = require("../../middlewares/requestValidator");

const {
  createGoalSchema,
  editGoalSchema,
  changeGoalStatusSchema,
} = require("../../validators/goal");

const router = express.Router();

router.get("/get_my_goals", authorize(), async (req, res) => {
  const { is_completed } = req.query;
  const { user } = req.authSession;

  const query = { createdBy: user._id };

  if (is_completed) {
    query.isCompleted = is_completed === "1" ? true : false;
  }

  const goals = await Goal.find(query);

  res.send(goals);
});

router.post(
  "/create_goal",
  requestValidator(createGoalSchema),
  authorize(),
  async (req, res) => {
    const { user } = req.authSession;
    const body = _.pick(req.body, [
      "title",
      "goalCategory",
      "preDefinedGoalRef",
      "iAm",
      "accomplishingDate",
      "afterAccomplishment",
      "importanceOfGoal",
      "image",
      "audio",
      "isPublic",
    ]);

    const { preDefinedGoalRef, accomplishingDate } = body;

    const goalCategory = await GoalCategory.findById(body.goalCategory);

    if (!goalCategory)
      return res
        .status(400)
        .send({ error: { goalCategory: "Invalid Goal Category" } });

    const goal = await new Goal({
      ...body,
      goalCategory,
      createdBy: user._id,
    }).save();
    if (preDefinedGoalRef) {
      const preDefinedGoal = await PreDefinedGoal.findById(preDefinedGoalRef);

      const today = getToday();

      let intervals = splitDateIntoEqualIntervals(
        today,
        new Date(accomplishingDate),
        4
      );

      intervals = intervals.map((da) => {
        const date = new Date(da);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      });

      const preDefinedMilestones = await PreDefinedMilestone.find({
        preDefinedGoal: preDefinedGoalRef,
        isActive: true,
      });

      preDefinedMilestones.forEach(async (ms) => {
        const mileStone = await new Milestone({
          title: ms.title,
          createdBy: user._id,
          goal: goal._id,
        }).save();

        const subMilestones = await PreDefinedSubMilestone.find({
          preDefinedMilestone: ms._id,
          isActive: true,
        });

        subMilestones.forEach(async (subMs) => {
          await new SubMilestone({
            title: subMs.title,
            createdBy: user._id,
            goal: goal._id,
            milestone: mileStone._id,
          }).save();
        });
      });
    }
    res.send(goal);
  }
);

router.put(
  "/change_status/:id",
  requestValidator(changeGoalStatusSchema),
  authorize(),
  async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id))
      return res.status(404).send({ error: { message: "Goal not found!" } });

    const body = _.pick(req.body, ["isCompleted"]);

    const goal = await Goal.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!goal)
      return res.status(404).send({ error: { message: "Goal not found!" } });

    res.send(goal);
  }
);

router.put(
  "/edit_goal/:id",
  requestValidator(editGoalSchema),
  authorize(),
  async (req, res) => {
    const { id } = req.params;
    if (!validateObjectId(id))
      return res.status(404).send({ error: { message: "Goal not found!" } });

    const body = _.pick(req.body, [
      "title",
      "goalCategory",
      "preDefinedGoalRef",
      "iAm",
      "accomplishingDate",
      "afterAccomplishment",
      "importanceOfGoal",
      "image",
      "audio",
    ]);

    const { user } = req.authSession;

    const goal = await Goal.findOneAndUpdate(
      { _id: id, createdBy: user._id },
      body,
      { new: true }
    );

    if (!goal)
      return res.status(404).send({ error: { message: "Goal not found!" } });

    res.send(goal);
  }
);

function splitDateIntoEqualIntervals(startDate, endData, numberOfIntervals) {
  let diff = endData.getTime() - startDate.getTime();
  let intervalLength = diff / numberOfIntervals;
  let intervals = [startDate];
  for (let i = 1; i <= numberOfIntervals; i++)
    intervals.push(new Date(startDate.getTime() + i * intervalLength));
  return intervals;
}

function getToday() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  console.log("Day => ", day);
  console.log("Month => ", month);
  console.log("Year => ", year);
  return new Date(`${month}/${day}/${year}`);
}

module.exports = router;
