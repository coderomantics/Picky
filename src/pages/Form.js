
import React, {useState, useContext, useEffect} from "react";
import { ApiClient } from "../apiClient";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

import '../css/Form.css';
import { SocketProvider} from '../App';
import style from '../css/Form.module.css';
import FormQuestion from './FormQuestion'

ChartJS.register(ArcElement, Tooltip, Legend);




export default function Form({title, questions, players, setPlayers}) {

  
  const socket = useContext(SocketProvider)
  

  useEffect(() => {
    //Whenever players have been updated, the event will be emitted to socket.io
    socket.emit("update-players", players)
  }, [players])
  
  // const api = new ApiClient();

  //post req unfinished
 
  // function submitFormHandler (event) {
  //   event.preventDefault();
  //   api.postFilledForm(players)
  // }

  //create a component for one question and result
  //bring selectedplayer and map function there
  //



  return (
    <div className="form-container">
      {/* <form className={style["form"]} onSubmit={submitFormHandler}> */}
      <p id='formT'>{title}</p>
      <div className='question-card-container'>
       {questions.map((qn) => (
        <FormQuestion qn={qn} players={players}/>
        
       ))
      }
      </div>
      
        {/* <button type='submit'> SAVE RESPONSES</button>  HAHAHA BUTTON DOESNT WORK*/}
      {/* </form> */}
              
    </div>
  )
}
