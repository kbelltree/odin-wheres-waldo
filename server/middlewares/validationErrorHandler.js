const { validationResult } = require('express-validator');

function handleErrors(req, res, next) {
  const result = validationResult(req).formatWith(({ msg }) => msg);

  if (!result.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failure.',
      details: result.array(),
    });
  }

  next();
}

module.exports = {
  handleErrors,
};
