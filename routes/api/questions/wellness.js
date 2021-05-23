const express = require("express");
const Wellness = require("../../../models/questions/Wellness");
const Goal = require("../../../models/Goal");

const authorize = require("../../../middlewares/authorize");
const requestValidator = require("../../../middlewares/requestValidator");

const dynamicSchema = require("../../../validators/questions/dynamicSchema");

const calculateQuestionGroupScore = require("../../../methods/calculateQuestionGroupScore");
const calculateGoalScore = require("../../../methods/calculateGoalScore");
const claculateCategoryAverageScore = require("../../../methods/claculateCategoryAverageScore");

const router = express.Router();

const scoreFields = [
  "satisfiedWithSleep",
  "regularExerciseParticipation",
  "lastTwoWeeksSubstanceUsage",
  "lastMonthMood",
  "tolarantTowardsChange",
  "gratefullFor",
];

router.get("/", authorize(), async (req, res) => {
  const { user } = req.authSession;
  let wellness = await Wellness.findOne({ answeredBy: user._id });
  if (!wellness) wellness = await new Wellness({ answeredBy: user._id }).save();

  res.send(wellness);
});

const apis = [{ route: "/update_all", fieldName: scoreFields }];

scoreFields.forEach((field) => {
  apis.push({
    route: "/" + field,
    fieldName: field,
  });
});

apis.forEach(({ route, fieldName }) => {
  router.post(
    route,
    requestValidator(dynamicSchema(fieldName)),
    authorize(),
    async (req, res) => {
      const { user } = req.authSession;
      let wellness = await Wellness.findOne({ answeredBy: user._id });
      if (!wellness)
        wellness = await new Wellness({ answeredBy: user._id }).save();

      if (!Array.isArray(fieldName)) fieldName = [fieldName];

      fieldName.forEach((field) => {
        wellness[field] = req.body[field];
      });
      wellness.totalWellnessScore = calculateQuestionGroupScore(
        wellness,
        scoreFields
      );

      await wellness.save();
      user.wellnessScore = wellness.totalWellnessScore;
      await user.save();
      updateScores(user._id);
      res.send(wellness);
    }
  );
});

const updateScores = async (id) => {
  const goals = await Goal.find({ createdBy: id, isCompleted: false });

  for (let i = 0; i < goals.length; ++i) {
    const goal = goals[i];
    await calculateGoalScore(goal._id, false);
  }

  await claculateCategoryAverageScore(id);
};

module.exports = router;
