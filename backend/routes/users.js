const router = require('express').Router();

const { getUsers, getOneUser } = require('../controllers/users');

// Получение  всех юзеров
router.get('/users', getUsers);


// Получение определенного юзера
router.get('/users/:_id', getOneUser);




module.exports = router;
