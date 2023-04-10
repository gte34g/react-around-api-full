const router = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

// const {
//   authValidation,
//   // validateUserdId,
//   updateUserValidation,
//   updateAvatarValidation,
// } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/me', getCurrentUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
