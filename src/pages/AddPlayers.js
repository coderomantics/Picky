import { useState } from 'react';
import {Link} from 'react-router-dom';

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
    <main style={{padding: '1rem 0'}}>
      <h2>Create Game</h2>
      <h3>Add player</h3>
      <form onSubmit={addHandler}>
      <input
        type='text'
        name='name'
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        required/>
      <button type='submit'> Add </button>
     
    
      </form>
      
      {players.map((p, index) => 
      <li key={index}>
        <p>{p}</p>
        <button onClick={() => removePlayer(index)}> X </button>
      </li>)}
      {/* // <h1>{p} <button onClick={() => removePlayer(i)}> X </button></h1>) */}

      <Link to='/questions'> New Game</Link>
    



    </main>
    </>
      )
  
}

