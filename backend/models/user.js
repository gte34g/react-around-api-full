const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { isEmail } = require('validator');

const avatarUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (value) => avatarUrl.test(value),
      message: (type) => `${type.value} is not valid URL`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Email is invalid'],
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
