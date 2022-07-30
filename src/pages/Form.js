
import {React, useEffect, useState} from "react";
import { ApiClient } from "../apiClient";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




export default function Form({title, questions, players}) {
  
  const data = {
    labels: players,
    datasets: [
      {
        label: '# of Votes',
        data: [1,0],    /*how to set data according to number of players*/
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

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
                required />
              {p}
            </label>
     
          )}   
          <Doughnut data={data} />
      
          

        </>
      ))
      }
        {/* <button type='submit'> SAVE RESPONSES</button>  HAHAHA BUTTON DONT WORK*/}
      </form>
              
    </div>
  )
}
