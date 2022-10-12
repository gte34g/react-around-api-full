const express = require('express');

const app = express();
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorPage = require('./routes/noRoute');

const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(helmet());
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/', errorPage);
app.post('/signin', login);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
