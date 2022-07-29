const mongoose = require('mongoose');
const {Schema} = mongoose;

const settings = {
  useNewUrlParser: true,
  useUnifiedTopology: true 
}

mongoose
  .connect('mongodb://127.0.0.1:27017/picky', settings)
  .then(() => {
    console.log('database connected');
  })
  .catch((err) => console.log(err));


const gameSchema = new Schema ({
  questions: [
    {
      title: String,
      player: String,
      score: Number
    }
  ]
})


const Game = mongoose.model('Game', gameSchema)

module.exports = Game;






