const SUCCESS_OK = 200;
const PASSED_CODE = 201;
const ERROR_CODE = 400;
const ForbiddenError = 403;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR_CODE = 500;

const USER_NOT_FOUND = 'No user found with that id';
const CARD_NOT_FOUND = 'No card found with that id';
const INVALID_DATA = 'Your input is not a valid data';
const DEFAULT_ERROR = 'An error has occurred on the server';

module.exports = {
  SUCCESS_OK,
  ERROR_CODE,
  DEFAULT_ERROR_CODE,
  PASSED_CODE,
  USER_NOT_FOUND,
  NOT_FOUND_ERROR,
  CARD_NOT_FOUND,
  INVALID_DATA,
  DEFAULT_ERROR,
  ForbiddenError,
};
