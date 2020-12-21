const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .catch((err) => {
      res.status(401).send({ message: err.message });
    })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      } if (user) {
        return bcrypt.compare(password, user.password)
        .then((matched) => {
          // аутентификация успешна
          const token = jwt.sign({
            _id: user._id
          }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {expiresIn: '7d'})
          if (!matched) {
          // хеши не совпали — отклоняем промис
          return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          res.send({ token });
        });
      }})
    .catch(next)
};



module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      } if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Неправильный id пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка чтения файла' });
    })
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  console.log(req.body)
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ message: 'Ошибка чтения файла' });
      }
    })
    .then((user) => res.send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email
    }))
    .catch(next);
};

module.exports.getOneUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(err.statusCode).send({ message: err.message });
      } if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Неправильный id пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка чтения файла' });
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body
  User.findByIdAndUpdate(
    req.user._id,
    { name , about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    } )
  .orFail(() => {
    const err = new Error('Пользователь не найден');
    err.statusCode = 404;
    throw err;
  })
  .catch((err) => {
    if (err.kind === undefined) {
      return res.status(err.statusCode).send({ message: err.message });
    } if (err.kind === 'ObjectId') {
      return res.status(400).send({ message: 'Неправильный id пользователя' });
    }
    return res.status(500).send({ message: 'Ошибка чтения файла' });
  })
  .then((user) => {
    res.status(200).send({ data: user })
  })
  .catch(next);
}


module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    } )
  .orFail(() => {
    const err = new Error('Пользователь не найден');
    err.statusCode = 404;
    throw err;
  })
  .catch((err) => {
    if (err.kind === undefined) {
      return res.status(err.statusCode).send({ message: err.message });
    } if (err.kind === 'ObjectId') {
      return res.status(400).send({ message: 'Неправильный id пользователя' });
    }
    return res.status(500).send({ message: 'Ошибка чтения файла' });
  })
  .then((user) => {
    res.status(200).send({ data: user })
  })
  .catch(next)
}
