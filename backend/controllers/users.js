require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const { JWT_SECRET } = require('../lib/config');
const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const processUserWithId = require('../lib/helpers');

const Unauthorized = require('../errors/Unauthorized');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFound');

const getUserData = (id, res, next) => {
  User.findById(id)
    .orFail(() => NotFoundError('User ID not found'))
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUsers = (req, res, next) => {
  getUserData(req.params.id, res, next);
};

// const getUserById = async (req, res) => {
//   const { _id } = req.params;
//   User.findById(_id)
//     .orFail()
//     .then((user) => res.send(user))
//     .catch((err) => {
//       if (err.name === 'DocumentNotFoundError') {
//         res.status(NotFoundError).send({ Error: err.message });
//       } else if (err.name === 'CastError') {
//         res.status(NotFoundError).send({ Error: err.message });
//       } else {
//         res.status(BadRequestError).send({ Error: err.message });
//       }
//     });
// };

const getUserById = (req, res, next) => {
  processUserWithId(req, res, User.findById(req.params._id), next);
};

const getCurrentUser = (req, res, next) => {
  getUserData(req.user._id, res, next);
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
  const { password, email } = req.body;
  return User.findUserByCredentials(email, password)
    .then((data) => {
      const token = jwt.sign(
        { _id: data._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
        {
          expiresIn: '7d',
        },
      );
      // eslint-disable-next-line no-shadow
      const { password, ...user } = data._doc;
      res.send({ token, user });
    })
    .catch((err) => {
      throw new Unauthorized(err.message);
    })
    .catch(next);
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
