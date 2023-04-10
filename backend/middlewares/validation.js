const { Joi, celebrate } = require('celebrate');
// const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateUrl = (v, helpers) => {
  if (validator.isURL(v)) {
    return v;
  }
  return helpers.error('string.uri');
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.message('invalid Email');
};

const authValidation = celebrate({
  headers: Joi.object()

    .keys({
      authorization: Joi.string().required(),
    })

    .unknown(true),
});

// const validateObjId = celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string()
//       .required()
//       .custom((value, helpers) => {
//         if (ObjectId.isValid(value)) {
//           return value;
//         }
//         return helpers.message('Invalid id');
//       }),
//   }),
// });

const validateObjId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
});

const validateCardBody = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const newCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.empty': 'Name is required (error here 1)',
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name must be less than 30 characters long',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.empty': 'About is required',
      'string.min': 'About must be at least 2 characters long',
      'string.max': 'About must be less than 30 characters long',
    }),
    avatar: Joi.string().uri(),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
    }),
  }),
});

const validateAuthentication = celebrate({
  headers: Joi.object()
    .keys({
      authorization: Joi.string().required(),
    })
    .unknown(true),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const validateSignup = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    })
    .unknown(true),
});

module.exports = {
  authValidation,
  validateUrl,
  validateObjId,
  validateCardBody,
  newCardValidation,
  validateUserBody,
  validateAuthentication,
  validateAvatar,
  validateProfile,
  validateLogin,
  validateSignup,
};
