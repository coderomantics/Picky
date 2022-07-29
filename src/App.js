import { useEffect, useState } from 'react';
import './App.css';
import AddPlayer from './pages/AddPlayers';
import Questions from './pages/Questions';
import Form from './pages/Form'
import {Routes, Route, Link} from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';


function App() {
  const [players, setPlayers] = useState([])
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  

  const addPlayer = (playerName) => {
    setPlayers(players => [...players, playerName])
   
  } // -> ['jess']
  
  const addQuestion = (question) => {
    setQuestions(questions => [...questions, question])
  }

  function removePlayer(playerIndex) {
    const newList = players.filter((_, index) => index !== playerIndex )
    setPlayers(newList);
  }

  function removeQuestion(qnIndex) {
    const newList = questions.filter((_, index) => index !== qnIndex )
    setQuestions(newList);
  }

  //HELPER FUNCTIONS
  const playersObj = players.map((player) => (
    {name: player, picked: false}
  ))

  //console.log(playersObj)

  const questionsObj = questions.map((question) => (
    {title: question, players: playersObj}
  ))

  //console.log(questionsObj) 


  return (
    <> 
      <div className="App">
      <nav>
        <Link to='/'>Picky</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Dashboard title={title}/>} />
        <Route path='/players' element={<AddPlayer players={players} addPlayer={addPlayer} removePlayer={removePlayer}/>} />
        <Route path='/questions' element={<Questions questions={questions} addQuestion={addQuestion} title={title} setTitle={setTitle} removeQuestion={removeQuestion}/>}/>
        <Route path='/form' element={<Form title={title} questions={questions} players={players} />} />
      </Routes>
    


    </div>
  </>
   
  );
}

export default App;
