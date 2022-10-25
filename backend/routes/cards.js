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

router.get('/cards', authValidation, getCards);
router.post('/cards', authValidation, newCardValidation, createCard);
router.put('/cards/:_id/likes', authValidation, cardValidationId, likeCard);
router.delete('/cards/:_id', authValidation, cardValidationId, deleteCardById);
router.delete('/cards/:_id/likes', authValidation, cardValidationId, disLikeCard);

module.exports = router;
