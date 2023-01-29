const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const {
  validateAuthentication,
  validateObjId,
  newCardValidation,
} = require('../middlewares/validation');

router.get('/', validateAuthentication, getCards);
router.post('/', validateAuthentication, newCardValidation, createCard);
router.put('/:_id/likes', validateAuthentication, validateObjId, likeCard);
router.delete('/:_id', validateAuthentication, validateObjId, deleteCardById);
router.delete('/:_id/likes', validateAuthentication, validateObjId, disLikeCard);

module.exports = router;
