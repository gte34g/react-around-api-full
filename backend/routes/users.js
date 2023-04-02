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
  validateAvatar,
  validateProfile,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:_id', getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', validateAvatar, validateProfile, updateAvatar);

module.exports = router;
