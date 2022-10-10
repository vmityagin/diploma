const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Неверно написан email'],
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Пользователь',
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

UserSchema.statics.findUserByCredentials = function checkData(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправльная почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильная почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', UserSchema);
