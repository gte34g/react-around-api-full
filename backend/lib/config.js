require('dotenv').config();

const { JWT_SECRET = 'secret-something' } = process.env;

module.exports = JWT_SECRET;
