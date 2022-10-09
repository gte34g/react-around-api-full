const mongoose = require('mongoose');

const cardUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    require: true,
    validate: {
      validator: (value) => cardUrl.test(value),
      message: (type) => `${type.value} is not valid URL`,
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
