const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFound');
const User = require('../models/user');

const processCardWithId = (req, res, action, next) =>
  action
    .orFail(() => {
      throw new NotFoundError('No card found with this Id');
    })
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        next(new NotFoundError('No card found with this Id'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });

const processUserWithId = (req, res, next) => {
  const { _id } = req.params;
  User.findOne({ _id })
    .orFail()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError(err.message);
      } else if (err.name === 'CastError') {
        throw new BadRequestError(err.message);
      }
    })
    .catch(next);
};

module.exports = { processCardWithId, processUserWithId };
