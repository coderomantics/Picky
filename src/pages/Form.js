
import {React} from "react";
import { ApiClient } from "../apiClient";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import '../css/Form.css'

ChartJS.register(ArcElement, Tooltip, Legend);




export default function Form({title, questions, players, setPlayers}) {
  
  console.log(players)
  const data = {
    labels: players.map((p) => p.name),
    datasets: [
      {
        label: '# of Votes',
        data: players.map((p) => p.score),    
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

  
  
  const api = new ApiClient();

  function answerHandler (event) {
    
    setPlayers(players =>
      players.map((obj) => {
        if (obj.name === event.target.value) {
          return {...obj, score: 1};
        } else  {
          return {...obj, score: 0};
        }
      }))  
  }
 
  function submitFormHandler (event) {
    event.preventDefault();
    api.postFilledForm(players)
  }

  return (
    <div className="form-container">
      <form onSubmit={submitFormHandler}>
      <h2 id='formT'>{title}</h2>
      {questions.map((qn) => (
        <>
          <h3 className="questionT">{qn}</h3>
          {players.map((p, i) =>
        
          <label className="label">
              <input className="vote-button"
                type='radio'
                name={qn}
                value={p.name}
    
                onClick={(event) => answerHandler(event, i)}
        
                required />
              {p.name}
              <Doughnut data={data} />
            </label>
     
          )}   
       
      
          

        </>
      ))
      }
        {/* <button type='submit'> SAVE RESPONSES</button>  HAHAHA BUTTON DONT WORK*/}
      </form>
              
    </div>
  )
}
