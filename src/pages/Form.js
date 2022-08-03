
import React, {useContext} from "react";
// import { ApiClient } from "../apiClient";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

import '../css/Form.css';
import { SocketProvider} from '../App';
import FormQuestion from './FormQuestion'

ChartJS.register(ArcElement, Tooltip, Legend);




export default function Form({title, questions, players, voteForPlayer}) {
  // console.log('check players', players)
  // const socket = useContext(SocketProvider)
  
  // const socket = useContext(SocketProvider)
  

  // useEffect(() => {
  //   //Whenever players have been updated, the event will be emitted to socket.io
  //   socket.emit("update-players", players)
  // }, [players])
  
  // const api = new ApiClient();

  //post req unfinished
 
  // function submitFormHandler (event) {
  //   event.preventDefault();
  //   api.postFilledForm(players)
  // }

  



  return (
    <div className="form-container">
      <p id='formT'>{title}</p>
      <div className='question-card-container'>
       {questions.map((qn, i) => (
        
        <FormQuestion key={i} questions={questions} qn={qn} players={players} voteForPlayer={voteForPlayer}/>
        
       ))
      }
      </div>
      
              
    </div>
  )
}
