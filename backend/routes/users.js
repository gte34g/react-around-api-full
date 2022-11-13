const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {
  validateObjId,
  validateAvatar,
  validateProfile,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:_id', validateObjId, getUserById);
router.get('/me', getCurrentUser);

router.patch('/me', validateProfile, updateUser);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
