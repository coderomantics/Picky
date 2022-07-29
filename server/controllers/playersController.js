const {Game} = require('../models/index')

async function getPlayers(req, res) {
  try {
    const players = await Game.playersSchema.find();
    res.status(201)
    console.log(players)
    res.json(players)
    } catch (err) {
      res.status(400).send({err}) 
  }
};

async function addPlayer( req, res) {
  try {
    const player = new Game.playersSchema ({
      players: req.body.players
    })
    player.save()
    
    res.status(201)
    res.json(player)
    } catch (err) {
    res.status(400).send({err})
  }
}

module.exports = {getPlayers, addPlayer};