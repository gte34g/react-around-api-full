const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateUser,
  validateUserdId,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:_id', validateUserdId, getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', validateUser, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateUserValidation, updateAvatar);

module.exports = router;
