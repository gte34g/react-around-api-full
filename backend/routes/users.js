const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  updateUser,
  updateAvatar,
  getUserById,
} = require('../controllers/users');

const {
  validateUserId,
  authValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');
// const auth = require('../middlewares/auth');

router.get('/', authValidation, getUsers);
router.get('/:_id', authValidation, validateUserId, getUserById);

router.patch('/me', authValidation, updateUser);
router.patch('/me/avatar', authValidation, updateUserValidation, updateAvatarValidation, updateAvatar);

module.exports = router;
