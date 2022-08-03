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



  

  return (
    <>
    <div className='add-players-container'>
      <p id='create-game'>Create New Game</p>
      <form onSubmit={addHandler} className='form-container'>
        <input id='input-box'
          type='text'
          name='name'
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          required/>
        <div id='add-btn'>
          <button id='add-players-button' type='submit'> <p>Add player</p></button>
        </div>
      </form>
      <div className='players-list-container'>
        {players.map((p, index) => 
            <li className='players-list' key={index}>
              <p className='player-name'>{p.name}</p>
              <button className='remove-button' onClick={() => removePlayer(index)}> X </button>
            </li>)}
    
      </div>
      
      <div className='new-game'>
        <Link style={{textDecoration: 'none'}} to='/questions'><p className='new-game-btn'>New Game</p> </Link>
      </div>

    </div>
    </>
      )
  
}

