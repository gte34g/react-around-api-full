const router = require('express').Router();
const userRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NoRoute = require('./noRoute');
const { createUser, login } = require('../controllers/users');
const { validateUserBody, validateLogin } = require('../middlewares/validation');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use('*', NoRoute);

module.exports = router;
