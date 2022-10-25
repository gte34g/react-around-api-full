const Card = require('../models/card');

const {
  SUCCESS_OK,
  ERROR_CODE,
  NOT_FOUND_ERROR,
  CARD_NOT_FOUND,
  ForbiddenError,
} = require('../lib/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ERROR_CODE(err.message));
      } else {
        next(err);
      }
    });
};

const deleteCardById = (req, res, next) => {
  const { _id } = req.params;
  Card.findByIdAndRemove(_id)
    .orFail(() => {
      throw new NOT_FOUND_ERROR(CARD_NOT_FOUND);
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('You are not authorized to delete this card'));
      } else {
        Card.findByIdAndRemove(_id).then((deletedCard) =>
          res.status(200).send(deletedCard));
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NOT_FOUND_ERROR('Data is not found'))
    .then((card) => res.status(SUCCESS_OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ERROR_CODE('Invalid data'));
      }
      return next(err);
    });
};

const disLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NOT_FOUND_ERROR('Data is not found'))
    .then((card) => res.status(SUCCESS_OK).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ERROR_CODE('Invalid data'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
};
