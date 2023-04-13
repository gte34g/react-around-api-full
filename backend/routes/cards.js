const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');
const {
  validateCardId,
  newCardValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', newCardValidation, createCard);
router.put('/:_id/likes', validateCardId, likeCard);
router.delete('/:_id', validateCardId, deleteCardById);
router.delete('/:_id/likes', validateCardId, disLikeCard);

module.exports = router;
