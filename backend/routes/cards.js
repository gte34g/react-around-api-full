const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const {
  cardValidationId,
  newCardValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', newCardValidation, createCard);
router.put('/:_id/likes', cardValidationId, likeCard);
router.delete('/:_id', cardValidationId, deleteCardById);
router.delete('/:_id/likes', cardValidationId, disLikeCard);

module.exports = router;
