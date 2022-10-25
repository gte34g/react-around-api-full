const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const NOT_FOUND_ERROR = ('../errors/NotFound');
const ConflictError = ('../errors/ConflictError');
const Validation = ('../errors/Validation.js');
const Unauthorized = ('../errors/Unauthorized');
const {
  DEFAULT_ERROR_CODE,
  USER_NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  SUCCESS_OK,
} = require('../lib/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(new NOT_FOUND_ERROR('Data is not found'))
    .then((users) => res.status(SUCCESS_OK).send(users))
    .catch(next);
};

const getUserById = async (req, res, next) => {
  const { _id } = req.params;
  User.findById(_id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ Error: USER_NOT_FOUND });
      } else if (err.name === 'CastError') {
        res.status(Validation).send({ Error: INVALID_DATA });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    })
    .catch(next);
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
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Validation(err.message));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { name: req.body.name, about: req.body.about },
    { runValidators: true, new: true },
  )
    .orFail(new NOT_FOUND_ERROR('Data is not found'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Validation('Invalid data'));
      } if (err.name === 'ValidationError') {
        return next(new Validation('Invalid data'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { avatar: req.body.avatar },
    { runValidators: true, new: true },
  )
    .orFail(new NOT_FOUND_ERROR('Data is not found'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Validation('Invalid data'));
      } if (err.name === 'ValidationError') {
        return next(new Validation('Invalid data'));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NOT_FOUND_ERROR('Data is not found'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized('Incorrect email or password'));
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
