const Card = require('../models/card');

module.exports.getCards = (req, res) => Card.find({})
  .orFail(() => {
    console.log(data)
    const err = new Error('Карточка не найдена');
    err.statusCode = 404;
    throw err;
  })
  .then((data) => res.send(data))
  .catch((err) => {
    if (err.kind === 'ObjectId') {
      return res.status(400).send({ message: 'Невалидный Id' });
    } if (err.statusCode === 404) {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    return res.status(500).send({ message: 'Ошибка чтения файла' });
  });

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id)
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === undefined) {
        return res.status(404).send({ message: err.message });
      } if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'Ошибка чтения файла' });
    });
};

module.exports.deleteCard = (req, res) => Card.findByIdAndRemove(req.params._id)
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Нет карточки с таким id' });
    }
    return res.status(200).send(card);
  }).catch((err) => {
    if (err.name === 'ValidationError') {
      const errorList = Object.keys(err.errors);
      const messages = errorList.map((item) => err.errors[item].message);
      res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
    } else {
      res.status(500).send({ message: 'Ошибка чтения файла' });
    }
  });

module.exports.addLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params._id,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true }
  )
  .orFail(() => {
    const err = new Error('Карточка не найдена');
    err.statusCode = 404;
    throw err;
  })
  .then((likes) => res.send(likes))
  .catch((err) => {
   if (err.kind === undefined) {
     return res.status(404).send({ message: err.message });
    } if (err.kind === 'ObjectId') {
     return res.status(400).send({ message: 'Нет карточки с таким id' });
    }
    return res.status(500).send({ message: 'Ошибка чтения файла' });
  });


module.exports.removeLike = (req, res) =>
Card.findByIdAndUpdate(
  req.params._id,
  {
    $pull: { likes: req.user._id },
  },
  { new: true }
)
.orFail(() => {
  const err = new Error('Карточка не найдена');
  err.statusCode = 404;
  throw err;
})
.then((likes) => res.send(likes))
.catch((err) => {
 if (err.kind === undefined) {
   return res.status(404).send({ message: err.message });
  } if (err.kind === 'ObjectId') {
   return res.status(400).send({ message: 'Нет карточки с таким id' });
  }
  return res.status(500).send({ message: 'Ошибка чтения файла' });
});
