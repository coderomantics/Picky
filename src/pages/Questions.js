import {useState} from 'react';
import {Link} from 'react-router-dom';



export default function Questions({ questions, addQuestion, title, setTitle }) {
 
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
    <div>
      <div className="form-title">
        <form >
        <input
          placeholder="Untitled game"
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          on
          value={title}/>
        </form>
      </div>
      
      <div className='questions-cards'>
      <form onSubmit={addHandler}>
      <input
        type='text'
        name='question'
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        required/>
      <button type='submit'> Add </button>
     
    
      </form>
      {questions.map((qn) => <p>{qn}</p>)}
      
           
      </div>
      <Link to='/form'> Save Game {addTitle}</Link>
      
    </div>
    </>
  )
}