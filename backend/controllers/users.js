const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      } if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Неправильный id пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка чтения файла' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  // User.create({ name, about, avatar, email, password })
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    // .then((user) => res.send(user))
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ message: 'Ошибка чтения файла' });
      }
    });
};

module.exports.getOneUser = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send(user);
    }).catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      } if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Неправильный id пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка чтения файла' });
    });
};
