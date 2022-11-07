const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const {
  authValidation,
  cardValidationId,
  newCardValidation,
} = require('../middlewares/validation');

router.get('/', authValidation, getCards);
router.post('/', authValidation, newCardValidation, createCard);
router.put('/:_id/likes', authValidation, cardValidationId, likeCard);
router.delete('/:_id', authValidation, cardValidationId, deleteCardById);
router.delete('/:_id/likes', authValidation, cardValidationId, disLikeCard);

module.exports = router;
