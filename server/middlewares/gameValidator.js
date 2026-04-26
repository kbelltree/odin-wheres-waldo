const { param, body } = require('express-validator');
const validationErrorHandler = require('./validationErrorHandler');

function validateUuidInParam(id) {
  return [
    param(id).isUUID('all').withMessage('The id is invalid.'),

    validationErrorHandler.handleErrors,
  ];
}

const validateTargetChoice = [
  body('name')
    .trim()
    .notEmpty()
    .isAlphanumeric()
    .withMessage('Name is invalid.'),

  body('x')
    .trim()
    .notEmpty()
    .withMessage('X value can not be empty.')
    .isFloat({ min: 0, max: 1 })
    .withMessage('X value must be between 0 and 1.'),

  body('y')
    .trim()
    .notEmpty()
    .withMessage('x value can not be empty.')
    .isFloat({ min: 0, max: 1 })
    .withMessage('Y value must be between 0 and 1.'),

  validationErrorHandler.handleErrors,
];

const validatePlayerName = [
  body('playerName')
    .optional({ values: 'falsy' })
    .isAlphanumeric()
    .isLength({ min: 1, max: 25 })
    .withMessage('Player Name must be alphanumeric and within 25 characters.'),

  validationErrorHandler.handleErrors,
];

module.exports = {
  validateUuidInParam,
  validateTargetChoice,
  validatePlayerName,
};
