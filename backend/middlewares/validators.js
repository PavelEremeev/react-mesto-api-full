const { celebrate, Joi, CelebrateError } = require('celebrate');

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.link().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  })
})

const validateUserId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

const validateUserInfoUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(20),
  }),
});

const validateUserAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.link().required(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});


const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.link().required(),
  }),
});


module.exports = {
  validateUser,
  validateUserId,
  validateUserInfoUpdate,
  validateUserAvatarUpdate,
  validateLogin,
  validateCard,
};