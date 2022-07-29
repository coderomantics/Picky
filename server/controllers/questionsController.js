const Game = require('../models/index')

async function getQuestions(req, res) {
  try {
    const questions = await Game.questions.find();
    res.status(201)
    res.json(questions)
    } catch (err) {
      res.status(400).send({err}) 
  }
};

async function addQuestion( req, res) {
  try {
    const question = new Game ({
      questions: req.body.questions
    })
    question.save()
    
    res.status(201)
    res.json(question)
    } catch (err) {
    res.status(400).send({err})
  }
}

module.exports = {getQuestions, addQuestion};