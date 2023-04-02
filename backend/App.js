/* eslint-disable no-console */
const express = require('express');

require('dotenv').config({ path: './.env' });

const app = express();
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
// const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const { validateLogin, validateSignup } = require('./middlewares/validation');
// const routes = require('./routes');
const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NoRoute = require('./routes/noRoute');
// mongoose.set('strictQuery', false);
const url = process.env.CONNECTION_URL.toString();

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB :)');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB: ', err.message);
  });

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateSignup, createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardsRouter);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
app.use(express.json());
// app.use(router);
app.use(helmet());
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.use('*', NoRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
