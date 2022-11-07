const NOT_FOUND_ERROR = require('../errors/NotFound');

const errorPage = (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Requested resource not found' });
};

module.exports = errorPage;
