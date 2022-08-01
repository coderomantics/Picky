import React, { useEffect, useState } from 'react';
import './App.css';
import AddPlayer from './pages/AddPlayers';
import Questions from './pages/Questions';
import Form from './pages/Form'
import {Routes, Route, Link} from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import io from 'socket.io-client';

export const SocketProvider = React.createContext();

const socket = io('http://127.0.0.1:3008');


function App() {
  const [players, setPlayers] = useState([])
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])
  

  const addPlayer = (playerName) => {
    setPlayers(players => [...players, 
      {name: playerName}])
   
  } 
  
  // const addQuestion = (question) => {
  //   setQuestions(questions => [...questions, question])
  // }
  const addQuestion = (question) => {
    setQuestions(questions => [...questions, {
      title: question,
      players
    }])
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
  // const playersObj = players.map((player) => (
  //   {name: player, picked: false}
  // ))

  // //console.log(playersObj)

  // const questionsObj = questions.map((question) => (
  //   {title: question, players: playersObj}
  // ))

  //console.log(questionsObj) 


  return (
    <> 
     <SocketProvider.Provider value={socket}>
     <div className="app-container">
      <nav>
        <Link style={{textDecoration: 'none'}} to='/'>
        <ul className='app-name'>
        <li className="text text-1">P</li>
        <li className="text text-2">I</li>
        <li className="text text-3">C</li>
        <li className="text text-4">K</li>
        <li className="text text-5">Y</li>
        </ul>
        </Link>
      </nav>
      <Routes>
        <Route path='/' element={<Dashboard title={title}/>} />
        <Route path='/players' element={<AddPlayer players={players} addPlayer={addPlayer} removePlayer={removePlayer}/>} />
        <Route path='/questions' element={<Questions questions={questions} addQuestion={addQuestion} title={title} setTitle={setTitle} removeQuestion={removeQuestion}/>}/>
        <Route path='/form' element={<Form title={title} questions={questions} players={players} setPlayers={setPlayers} />} />
      </Routes>
    


    </div>
     </SocketProvider.Provider>
      
  </>
   
  );
}

export default App;
