const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  updateUser,
  updateAvatar,
  getUserById,
} = require('../controllers/users');

const auth = require('../middlewares/auth');

router.get('/', getUsers);
router.get('/:_id', getUserById);

router.patch('/me', updateUser);
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
