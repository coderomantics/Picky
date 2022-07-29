
import {React, useState} from "react";
import { ApiClient } from "../apiClient";





export default function Form({title, questions, players}) {
  const [score, setScore] = useState({});
  const api = new ApiClient();

  function answerHandler (event) {
    let vote = 0;
    const target = event.target;
    const name = target.value;
    const qn = target.name;
    if (target.checked) {
      vote++
    }

    setScore({
      title : qn,
      player : name, 
      score : vote
    })
    console.log(score)  
  }
  //submithandler will then post the filled in form 
  //after that get the filled form to render results 
  function submitFormHandler (event) {
    event.preventDefault();
    api.postFilledForm(score)
  }

  return (
    <div className="form">
      <form onSubmit={submitFormHandler}>
      <h2>{title}</h2>
      {questions.map((qn) => (
        <>
          <h3>{qn}</h3>
          {players.map((p) =>
        
          <label>
            <input
              type='radio'
              name={qn}
              value={p}
              onClick={answerHandler}
              required/>
              {p}
          </label>
     
          )}   
      
          

        </>
      ))
      }
        <button type='submit'> SAVE RESPONSES</button>
      </form>
              
    </div>
  )
}