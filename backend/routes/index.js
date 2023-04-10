const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NoRoute = require('./noRoute');
const { createUser, login } = require('../controllers/users');
// const validateLogin = require('../middlewares/validation');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), login);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use('*', NoRoute);

module.exports = router;
