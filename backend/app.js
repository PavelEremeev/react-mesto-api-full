const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const {login, createUser} = require('./controllers/users.js')
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const unknownRoute = require('./routes/unknown.js');
const auth = require('./middlewares/auth')
const {
  validateUser,
  validateLogin,
} = require('./middlewares/validators')

const app = express();
const PORT = 3000;
const mongoDbUrl = 'mongodb://localhost:27017/mestodb';
const mongoConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(mongoDbUrl, mongoConnectionOptions);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '5fa2d039cb2c1312e8710f73',
//   };
//   next();
// });

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', auth, usersRouter);
// app.use('/', auth, cardsRouter);
app.use('/users', usersRouter);
app.use('/', cardsRouter);
app.use('/', unknownRoute);
app.post('/signin', validateLogin, login);
app.post('/signup', validateLogin, createUser);


app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
