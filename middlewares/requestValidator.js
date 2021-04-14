module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { strict: true });
    return next();
  } catch (validationError) {
    const { path, errors } = validationError;
    res.status(400).send({
      error: {
        [path]: errors[0],
      },
    });
  }
};
