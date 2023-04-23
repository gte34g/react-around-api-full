/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;
// const { JWT_SECRET } = require('../lib/config');
const JWT_SECRET = 'secret-something';
const User = require('../models/user');

const processUserWithId = require('../lib/helpers');

const Unauthorized = require('../errors/Unauthorized');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFound');
const {
  SUCCESS_OK,
  DEFAULT_ERROR_CODE,
} = require('../lib/errors');

// GET
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(SUCCESS_OK).send({ data: users })) // 200
    .catch((err) => next(new DEFAULT_ERROR_CODE(err.message))); // 500
};

const getUserById = (req, res, next) => {
  const { _id } = req.params;
  User.findById(_id)
    .orFail(() => next(new NotFoundError('User not found'))) // 404
    .then((user) => {
      res.status(SUCCESS_OK).send({ data: user }); // 200
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Invalid user')); // 400
      }
      if (err instanceof NotFoundError) {
        return next(err); // 404
      }
      return next(new DEFAULT_ERROR_CODE(err.message)); // 500
    });
};

// GET
const getUser = (req, res, next) => {
  const { _id } = req.params;
  console.log('_id:', _id);
  if (!ObjectId.isValid(_id)) {
    return next(new BadRequestError('Invalid user ID')); // 400
  }
  return getUserById(_id, res, req, next);
};

const getCurrentUser = (req, res, next) => {
  getUserById(req.user._id, res, req, next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Email already exists');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }))
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  processUserWithId(
    req,
    res,
    User.findByIdAndUpdate(
      _id,
      { name, about },
      { runValidators: true, new: true },
    ),
    next,
  );
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  processUserWithId(
    req,
    res,
    User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true }),
    next,
  );
};

// const getCurrentUser = (req, res, next) => {
//   const { _id } = req.user;
//   User.findById(_id)
//     .orFail()
//     .then((user) => res.send(user))
//     .catch((err) => {
//       if (err.name === 'DocumentNotFoundError') {
//         throw new NotFoundError(err.message);
//       } else if (err.name === 'CastError') {
//         throw new BadRequestError(err.message);
//       }
//     })
//     .catch(next);
// };

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      // eslint-disable-next-line no-shadow
      res.send({ data: user.toJSON(), token });
    })
    .catch((err) => {
      throw new Unauthorized(err.message);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
