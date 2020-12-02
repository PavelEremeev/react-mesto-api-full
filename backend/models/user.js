const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /[a-zA-ZА-ЯЁа-яё\s\d\-]+/.test(v);
      },
      message: 'Введите имя',
    },
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /[a-zA-ZА-ЯЁа-яё\s\d\-]+/.test(v);
      },
      message: 'Введите описание',
    },
  },

  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: 'Введите ссылку',
    },
  },
});

module.exports = model('user', userSchema);
