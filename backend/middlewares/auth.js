const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secret-something';
const Unauthorized = require('../errors/Unauthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  // eslint-disable-next-line no-console
  console.log('This is the auth.js', authorization);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('You are not authorized'));
  }
  // eslint-disable-next-line no-console
  console.log(JWT_SECRET);
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized('You are not authorized'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
