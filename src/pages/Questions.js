import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { SocketProvider } from '../App';
import '../css/Questions.css';




export default function Questions({ questions, addQuestion, title, setTitle, removeQuestion }) {
  const socket = useContext(SocketProvider);
  const [inputText, setInputText] = useState('')
  
  function addHandler (event) {
    event.preventDefault();
    addQuestion(inputText)
    if (questions.length >=10) {
      alert('Maximum number of questions reached');
    }
    setInputText('')
  }

  const updateTitle = (titleName) => {
    socket.emit('update-title', titleName );
    setTitle(titleName);
  } 
  

  return (
    <>
    <div className='questions-container'>
      <div className="title-container">
        <form id='title-form' onSubmit={(e) => e.preventDefault()}>
        <input id='title-input'
          placeholder="Untitled game"
          type='text'
          onChange={(e) => updateTitle(e.target.value)}
          value={title}/>
        </form>
      </div>
      
      <div className='questions-cards'>
      <form onSubmit={addHandler} id='question-form'>
      <input id='question-input'
        type='text'
        placeholder='Question 1'
        name='question'
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        required/>
     
      <button className='add-qn-button' type='submit'> Add </button>
      
      
     
    
      </form>
      </div>
      
    <div className='qn-list-container'>
      {questions.map((qn, index) => 
      <li className='questions-list' key={index}>
        <p className='question-name'>{qn.title}</p>
      
        <button className='remove-button' onClick={() => removeQuestion(index)}> X </button>
      
      </li>)}
      
           
    </div> 
      <Link style={{textDecoration: 'none'}} to='/form'> <p id='save-game'>Save Game</p></Link>
      
    </div>
    </>
  )
}