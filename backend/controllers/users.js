require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const { JWT_SECRET } = require('../lib/config');
const JWT_SECRET = 'secret-something';
const User = require('../models/user');

const processUserWithId = require('../lib/helpers');

const Unauthorized = require('../errors/Unauthorized');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFound');
const errorHandler = require('../middlewares/errorHandler');

// const getUserData = (id, res, next) => {
//   User.findById(id)
//     .orFail(() => NotFoundError('User ID not found'))
//     .then((users) => res.send({ data: users }))
//     .catch(next);
// };

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.send(errorHandler).send(err);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NotFoundError).send(err.message);
      } else if (err.name === 'CastError') {
        res.status(NotFoundError).send(err.message);
      } else {
        res.status(errorHandler).send(err.message);
      }
    });
};

// const getUserById = (req, res, next) => {
//   processUserWithId(req, res, User.findById(req.params.id), next);
// };

const getCurrentUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => NotFoundError('User ID not found'))
    .then((user) => res.send({ user }))
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
  const { id } = req.user;
  processUserWithId(
    req,
    res,
    User.findByIdAndUpdate(
      id,
      { name, about },
      { runValidators: true, new: true },
    ),
    next,
  );
};

const updateAvatar = (req, res, next) => {
  const { id } = req.user;
  const { avatar } = req.body;
  processUserWithId(
    req,
    res,
    User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true }),
    next,
  );
};

// const getCurrentUser = (req, res, next) => {
//   const { id } = req.user;
//   User.findById(id)
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
    .then((user) => {
      const token = jwt.sign({ id: user.id }, JWT_SECRET, {
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
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
