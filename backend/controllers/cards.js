const Card = require('../models/card');

const {
  ERROR_CODE,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR_CODE,
  PASSED_CODE,
  CARD_NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
} = require('../lib/errors');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    res.send(DEFAULT_ERROR_CODE).send(err);
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
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(PASSED_CODE).send(card))
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
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
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

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
};
