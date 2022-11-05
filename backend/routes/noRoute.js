const NOT_FOUND_ERROR = require('../errors/NotFound');

const errorPage = (req, res, next) => {
  next(new NOT_FOUND_ERROR('Requested resource not found'));
};

module.exports = { errorPage };
