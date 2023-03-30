const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NoRoute = require('./noRoute');
const { createUser, login } = require('../controllers/users');
const { validateSignup, validateLogin } = require('../middlewares/validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateSignup, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use('*', NoRoute);

module.exports = router;
