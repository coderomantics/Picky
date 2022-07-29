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

const playersSchema = new Schema ({
  players: {
    type: String,
  },
});

const questionsSchema = new Schema ({
  questions: {
    type: String,
  }
})
const Game = mongoose.model('Game', playersSchema, questionsSchema)

module.exports = Game;






