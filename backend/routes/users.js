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
} = require('../middlewares/validation');
// const auth = require('../middlewares/auth');

router.get('/', getUsers);
router.get('/me', validateUserId, getUserById);

router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
