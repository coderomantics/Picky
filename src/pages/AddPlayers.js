import { useState } from 'react';
import {Link} from 'react-router-dom';
import '../css/AddPlayers.css'

export default function CreateGame({ players, addPlayer, removePlayer }) {
  const [inputText, setInputText] = useState('')
  

  function addHandler (event) {
    event.preventDefault();
    addPlayer(inputText)
    if (players.length >=20) {
      alert('Maximum number of players reached');
    }
    setInputText('')
  }

  // function removePlayer(playerIndex) {
  //   const newList = players.filter((_, index) => index !== playerIndex )
  //   setPlayers(newList);
  // }

  

  return (
    <>
    <div className='add-players-container' style={{padding: '1rem 0'}}>
      <h2>Create Game</h2>
      <h3>Add player</h3>
      <form onSubmit={addHandler} className='form-container'>
      <input id='input-box'
        type='text'
        name='name'
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        required/>
      <button id='add-players-button' type='submit'> Add </button>
     
    
      </form>
      
      {players.map((p, index) => 
      <li className='players-list' key={index}>
        <p className='player-name'>{p.name}</p>
        <button className='remove-button' onClick={() => removePlayer(index)}> X </button>
      </li>)}
      {/* // <h1>{p} <button onClick={() => removePlayer(i)}> X </button></h1>) */}

      <Link to='/questions'> New Game</Link>
    



    </div>
    </>
      )
  
}

