
import {React, useState} from "react";





export default function Form({title, questions, players}) {
  const [score, setScore] = useState(0);

  function answerHandler () {
    console.log('clicked')
    setScore(score + 1)
    console.log(score)
  }

  return (
    <div className="form">
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
            onClick={(e)=> answerHandler(e.target.value)}
            required/>
            {p}
        </label>
          )}   
          

        </>
      ))
      }
  
     
              
    </div>
  )
}