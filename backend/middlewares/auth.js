const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

const { JWT_SECRET } = require('../lib/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('You are not authorized'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      JWT_SECRET,
    );
  } catch (err) {
    return next(new Unauthorized('You are not authorized'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
