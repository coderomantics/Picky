const express = require('express');
const router = express.Router();
// const players = require('./controllers/playersController');
const game = require('./controllers/formController');

router.get('/form', game.getResponses);
router.post('/form', game.postResponses)

// router.get('/players', players.getPlayers);
// router.post('/players', players.addPlayer);

module.exports = router;