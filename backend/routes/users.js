const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const auth = require('../middlewares/auth');
const { validateUserId } = require('../middlewares/validation');

router.get('/', auth, getUsers);
router.get('/:_id', validateUserId, getUser);
router.get('/me', getCurrentUser);
router.patch('/me', auth, updateUser);
router.patch(
  '/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().uri(),
    }),
  }),
  updateAvatar,
);

module.exports = router;
