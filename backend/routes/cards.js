const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');
const {
  newCardValidation,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', newCardValidation, createCard);
router.put('/:_id/likes', likeCard);
router.delete('/:_id', deleteCardById);
router.delete('/:_id/likes', disLikeCard);

module.exports = router;
