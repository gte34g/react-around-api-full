const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

const {
  validateObjId,
  validateCardBody,
} = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCardBody, createCard);
router.put('/:_id/likes', validateObjId, likeCard);
router.delete('/:_id', validateObjId, deleteCardById);
router.delete('/:_id/likes', validateObjId, disLikeCard);

module.exports = router;
