require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const {login, createUser} = require('./controllers/users.js')
const { requestLogger, errorLogger } = require('./middlewares/logger.js')
const { errors } = require('celebrate');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const unknownRoute = require('./routes/unknown.js');
const auth = require('./middlewares/auth')
const {
  validateUser,
  validateLogin,
} = require('./middlewares/validators')

const app = express();
const { PORT = 3000 } = process.env;
const mongoDbUrl = 'mongodb://localhost:27017/mestodb';
const mongoConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(mongoDbUrl, mongoConnectionOptions);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
// app.use('/users', usersRouter);
// app.use('/cards', cardsRouter);
app.use('/', unknownRoute);
app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

// обработка ошибок
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  if (err.status !== '500') {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `Ошибка на сервере: ${err.message}` });
  next();
});

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
