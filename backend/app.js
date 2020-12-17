require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const {login, createUser} = require('./controllers/users.js')
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
const PORT = 3000;
const mongoDbUrl = 'mongodb://localhost:27017/mestodb';
const mongoConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

app.use(cookieParser());
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

// app.use('/users', auth, usersRouter);
// app.use('/cards', auth, cardsRouter);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('/', unknownRoute);
app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);


app.use(errors());

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
