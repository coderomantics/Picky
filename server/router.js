const express = require('express');
const router = express.Router();
const players = require('./controllers/playersController');

router.get('/players', players.getPlayers);
router.post('/players', players.addPlayer);

module.exports = router;