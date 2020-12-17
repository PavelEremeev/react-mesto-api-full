const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET }= process.env

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token)
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw handleAuthError(res)
  }
  req.user = payload;

  next();
};

// const extractBearerToken = (header) => {
//   return header.replace('Bearer ', '');
// };

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return handleAuthError(res);
//   }

//   const token = extractBearerToken(authorization);
//   let payload;

//   try {
//     payload = jwt.verify(token, JWT_SECRET);
//   } catch (err) {
//     return handleAuthError(res);
//   }

//   req.user = payload; // записываем пейлоуд в объект запроса
//   console.log(req.user)
//   next(); // пропускаем запрос дальше
// };