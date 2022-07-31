import {useState} from 'react';
import {Link} from 'react-router-dom';
import '../css/Questions.css'



export default function Questions({ questions, addQuestion, title, setTitle, removeQuestion }) {
 
  const [inputText, setInputText] = useState('')
  
  function addHandler (event) {
    event.preventDefault();
    addQuestion(inputText)
    if (questions.length >=10) {
      alert('Maximum number of questions reached');
    }
    setInputText('')
  }

  function addTitle (event) {
    event.preventDefault();
    setTitle(inputText)
  }
  

  return (
    <>
    <div className='questions-container'>
      <div className="form-title">
        <form id='title-form'>
        <input id='title-input'
          placeholder="Untitled game"
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}/>
        </form>
      </div>
      
      <div className='questions-cards'>
      <form onSubmit={addHandler} id='question-form'>
      <input id='question-input'
        type='text'
        name='question'
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        required/>
      <button className='questions-button' type='submit'> Add </button>
     
    
      </form>
      

      {questions.map((qn, index) => 
      <li className='questions-list' key={index}>
        <p className='question-name'>{qn}</p>
        <button className='remove-button' onClick={() => removeQuestion(index)}> X </button>
      </li>)}
      
           
      </div>
      <Link to='/form'> Save Game {addTitle}</Link>
      
    </div>
    </>
  )
}