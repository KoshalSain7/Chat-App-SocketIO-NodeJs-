const express = require('express');

const { createRooms, chat, joinchat } = require('../controllers/controller');

const router = express.Router();


router.get('/', createRooms);
router.post('/createchat', chat);
router.post('/joinchat', joinchat);

module.exports = router;