import React, { useEffect, useState } from 'react';
import './App.css';
import AddPlayer from './pages/AddPlayers';
import Questions from './pages/Questions';
import Form from './pages/Form'
import {Routes, Route, Link} from 'react-router-dom'; 
import Dashboard from './pages/Dashboard';
import io from 'socket.io-client';

export const SocketProvider = React.createContext();

console.log(process.env)

const SERVER_URL = process.env.NODE_ENV === 'production'
    ? 'https://guarded-temple-13032.herokuapp.com'
    : 'http://127.0.0.1:3008'

const socket = io(SERVER_URL, {
  withCredentials: false
})

function App() {
  const [players, setPlayers] = useState([])
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    socket.on('player-update-broadcast', (data) => {
      console.log('player-update-braodcast', data);
      setPlayers(data);
    })
  
    socket.on('question-update-broadcast', (data) => {
      console.log('updating question based on backend event', data)
      setQuestions(data);
    })
  
    socket.on('title-update-broadcast', (data) => {
      setTitle(data);
      console.log('title', data)
    })

    return () => {
      socket.off('player-update-broadcast');
      socket.off('question-update-broadcast');
      socket.off('title-update-broadcast');
    }
  }, [])
  
  const addPlayer = (playerName) => {
    const newPlayers = [...players, { name: playerName}];
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
    const cloned = [...questions]
    const questionIndex = cloned.findIndex((item) => item.title === question.title)

    const voteIndex = cloned[questionIndex].votes.findIndex((vote) => vote.clientId === socket.id)

    if(voteIndex !== -1){
      cloned[questionIndex].votes[voteIndex].name = playerName
    } else{
      cloned[questionIndex].votes.push({
        name: playerName,
        clientId: socket.id
      })
    }

    socket.emit('update-questions', cloned)
    setQuestions(cloned)
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
