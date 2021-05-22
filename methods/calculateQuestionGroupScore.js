module.exports = (questionGroup, scoreFields) => {
  const { questionsCount } = questionGroup;

  const weightage = 100 / questionsCount;

  let total = 0;

  scoreFields.forEach((field) => {
    const score = questionGroup[field];
    total += score * (weightage / 100);
  });
  return total;
};
