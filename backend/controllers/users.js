const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = require('../lib/config');

const User = require('../models/user');

const { processUserWithId } = require('../lib/helpers');
const { INVALID_DATA, DATA_EXIST } = require('../lib/errors');

const Unauthorized = ('../errors/Unauthorized');
// const ConflictError = ('../errors/ConflictError');
const Validation = ('../errors/Validation.js');

const getUsers = (req, res, next) => {
  processUserWithId(req, res, User.findById(req.user._id), next);
};

const getUserById = async (req, res, next) => {
  processUserWithId(req, res, User.findById(req.params.id), next);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        ...req.body,
        password: hash,
      })
        .then((user) => res.status(201).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new Validation(INVALID_DATA);
          } else {
            throw new Validation(DATA_EXIST);
          }
        }))
    .catch(next);
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

const getCurrentUser = (req, res, next) => {
  processUserWithId(req, res, User.findById(req.user._id), next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
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
