const router = require('express').Router();

const { createUser, getUser, getOneUser } = require('../controllers/users');

// Получение  всех юзеров
router.get('/users', getUser);

// Создание нового юзера
router.post('/users', createUser);

// Получение определенного юзера
router.get('/users/:_id', getOneUser);

module.exports = router;
