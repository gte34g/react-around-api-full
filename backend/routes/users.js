const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  // validateObjId,
  authValidation,
  validateAvatar,
  validateProfile,
} = require('../middlewares/validation');

router.get('/', authValidation, getUsers);
router.get('/:_id', authValidation, getUserById);
router.get('/me', authValidation, getCurrentUser);
router.patch('/me', authValidation, updateUser);
router.patch('/me/avatar', authValidation, validateAvatar, validateProfile, updateAvatar);

module.exports = router;
