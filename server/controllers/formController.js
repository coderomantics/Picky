const Game = require('../models/index')

async function getResponses(req, res) {
  try {
    const responses = await Game.find();
    res.status(201)
    console.log(responses)
    res.json(responses)
    } catch (err) {
      res.status(400).send({err}) 
  }
};

async function postResponses( req, res) {
  try {
    const responses = new Game ({
      title: req.body.title,
      player: req.body.player,
      score: req.body.score
    })
    responses.save()
    
    res.status(201)
    res.json(responses)
    } catch (err) {
    res.status(400).send({err})
  }
}



module.exports = {getResponses, postResponses};