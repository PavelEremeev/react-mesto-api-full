const router = require('express').Router();
const { getCard, createCard, deleteCard } = require('../controllers/cards');

// Получение карточек
router.get('/cards', getCard);

// Создание карточки
router.post('/cards', createCard);

// Удаление карточки
router.delete('/cards/:_id', deleteCard);

module.exports = router;
