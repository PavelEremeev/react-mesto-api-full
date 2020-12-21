const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET }= process.env

const handleAuthError = (res) => {
  return res
    .status(401)
    .send({ message: 'Необходима авторизация' });
};

module.exports = (req, res, next) => {
  // это заплатка на быструю руку - суть в том, что ты пытаешься читать из cookie, но
  // ты их не выставляешь, не чистишь, а передаешь токен при авторизации к теле запроса
  // потом когда ты делаешь запрос с клиента, твой токе с приставкой Barear  оказывается не в куках в а заголовке
  // Authorization , из него то нужно и читать
  // тут нужно проверить, что если нет заголовка, или токен неверный - не пускать дальше
  // const token = req.headers.authorization && req.headers.authorization.slice('Bearer '.length);

  let { authorization: token } = req.headers;

  if(!token || !token.startsWith('Bearer ')){
    return handleAuthError(res)
  }

  token = token.slice('Bearer '.length)

  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw handleAuthError(res)
  }
  req.user = payload;
  console.log(req.user)
  next();
};

// const extractBearerToken = (header) => {=
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