const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  authValidation,
  validateUserdId,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

router.get('/', authValidation, getUsers);
router.get('/:_id', authValidation, validateUserdId, getUserById);
router.get('/me', authValidation, getCurrentUser);
router.patch('/me', authValidation, updateUser);
router.patch('/me/avatar', authValidation, updateAvatarValidation, updateUserValidation, updateAvatar);

module.exports = router;
