const { Joi, celebrate } = require('celebrate');
const { isObjectIdOrHexString } = require('mongoose');
const validator = require('validator');

const validateUrl = (v, helpers) => {
  if (validator.isURL(v)) {
    return v;
  }
  return helpers.error('string.uri');
};

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (isObjectIdOrHexString.isValid(value)) {
        return value;
      }
      return helpers.message('Invalud id');
    }),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length is 2',
        'stting.max': 'The max length is 30',
        'string.empty': 'This field must be filled up',
      }),
    link: Joi.string().required().pattern(validateUrl)
      .message('The "link" field must be a valid URL'),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length is 2',
        'stting.max': 'The max length is 30',
      }),
    about: Joi.string().min(2).max(30)
      .message({
        'string.min': 'The minimum length is 2',
        'stting.max': 'The max length is 30',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
      }),
    email: Joi.string().required().email()
      .message('The "email" field, must be a valid email')
      .messages({
        'sring.required': 'The "email" field must be filled in',
      }),
    avatar: Joi.string().pattern(validateUrl)
      .message('The "avatar" field must be a valid URL'),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('The "email" field, must be a valid email')
      .messages({
        'sring.required': 'The "email" field must be filled in',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The "password" field must be filled up',
      }),
  }),
});

const validateAvatar = celebrate({
  body: {
    avatar: Joi.string().required().pattern(validateUrl)
      .message('The "avatar" field must be a valid URL'),
  },
});

const validateProfile = celebrate({
  body: ({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length is 2',
        'stting.max': 'The max length is 30',
      }),
    about: Joi.string().min(2).max(30)
      .message({
        'string.min': 'The minimum length is 2',
        'stting.max': 'The max length is 30',
      }),
  }),
});

module.exports = {
  validateUrl,
  validateObjId,
  validateCardBody,
  validateUserBody,
  validateAuthentication,
  validateAvatar,
  validateProfile,
};
