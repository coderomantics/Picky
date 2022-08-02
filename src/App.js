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
  const [questions, setQuestions] = useState([
    {
      title: "who is cooler?",
      votes: [
        { clientId: 34567890, player: 'ching' }
      ]
    }
  ])

  console.log(socket.id)

  socket.on('player-update-broadcast', (data) => {
    console.log(data);
    setPlayers(data);
  })

  socket.on('question-update-broadcast', (data) => {
    setQuestions(data);
  })

  socket.on('title-update-broadcast', (data) => {
    setTitle(data);
    console.log('title', data)
  })
  

  const addPlayer = (playerName) => {
    const newPlayers = [...players, {name: playerName}];
    console.log(newPlayers);
    socket.emit('update-players', newPlayers);
    setPlayers(newPlayers);
  } 

  function removePlayer(playerIndex) {
    const newList = players.filter((_, index) => index !== playerIndex )
    console.log(newList)
    socket.emit('update-players', newList);
    setPlayers(newList);
  }

  const voteForPlayer = (question, playerName) => {
    // setQUESTIONS...

    // get the socket clientId
    // socket.id
    
    // remove/change existing vote on question with matching socket it


    // add player name along with socket id to array of votes on selected question


    setPlayers((prev) => {
      
      const cloned = [...prev]
      
      //Reduce the score of the previously selected player by 1
      const oldPlayerIndex = cloned.findIndex((player) => player.name === playerName)
      if(oldPlayerIndex !== -1){
        //selectedPlayer exists
        const oldPlayer = cloned[oldPlayerIndex];
        oldPlayer.score = oldPlayer.score > 0 ? oldPlayer.score - 1 : 0;
        cloned[oldPlayerIndex] = oldPlayer
      }

      //Increse the score of the newly selected player by 1
      const newPlayerIndex = cloned.findIndex((player) => player.name === playerName)
      const newPlayer = cloned[newPlayerIndex]
      newPlayer.score ++
                          
      cloned[newPlayerIndex] = newPlayer

      socket.emit('update-players', cloned)

      return cloned
    })
  }
  
  const addQuestion = (question) => {
    const newQuestions = [...questions, {
      title: question,
      votes: []
    }]
    socket.emit('update-questions', newQuestions)
    setQuestions(newQuestions)
  }
  // const addQuestion = (question) => {
  //   setQuestions(questions => [...questions, {
  //     title: question,
  //     players
  //   }])
  // }

  function removeQuestion(qnIndex) {
    const newList = questions.filter((_, index) => index !== qnIndex )
    setQuestions(newList);
  }

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
        <Route path='/form' element={<Form title={title} questions={questions} players={players} voteForPlayer={voteForPlayer} />} />
      </Routes>
    


    </div>
     </SocketProvider.Provider>
      
  </>
   
  );
}

export default App;
