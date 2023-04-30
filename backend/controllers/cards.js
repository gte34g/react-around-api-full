const Card = require('../models/card');

const {
  // SUCCESS_OK,
  ERROR_CODE,
  NOT_FOUND_ERROR,
  CARD_NOT_FOUND,
  // ForbiddenError,
  DEFAULT_ERROR_CODE,
  PASSED_CODE,
  INVALID_DATA,
  DEFAULT_ERROR,
} = require('../lib/errors');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    res.status(DEFAULT_ERROR_CODE).send(err);
  }
};

const createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.status(PASSED_CODE).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE).send({ Error: err.message });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ Error: err.message });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    });
};

const deleteCardById = (req, res) => {
  const { _id } = req.params;
  Card.findByIdAndRemove(_id)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ Error: CARD_NOT_FOUND });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ Error: INVALID_DATA });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ Error: CARD_NOT_FOUND });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ Error: INVALID_DATA });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    });
};

const disLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND_ERROR).send({ Error: CARD_NOT_FOUND });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ Error: INVALID_DATA });
      } else {
        res.status(DEFAULT_ERROR_CODE).send({ Error: DEFAULT_ERROR });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
};
