const router = require('express').Router();

const {
  getUsers,
  getOneUser,
  updateUserAvatar,
  updateUserInfo
 } = require('../controllers/users');
const {
  validateUserId,
  validateUserInfoUpdate,
  validateUserAvatarUpdate,
} = require('../middlewares/validators')


// Получение  всех юзеров
router.get('/', getUsers);


// Получение определенного юзера
router.get('/:_id', validateUserId , getOneUser);


// Обновление информации
router.patch('/me', validateUserInfoUpdate, updateUserInfo)
router.patch('/me/avatar', validateUserAvatarUpdate, updateUserAvatar)


module.exports = router;
