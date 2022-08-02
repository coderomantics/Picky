
import React, {useState, useContext, useEffect} from "react";
import { ApiClient } from "../apiClient";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

import '../css/Form.css';
import { SocketProvider} from '../App';
import style from '../css/Form.module.css';
import FormQuestion from './FormQuestion'

ChartJS.register(ArcElement, Tooltip, Legend);




export default function Form({title, questions, players, setPlayers}) {

  // const [selectedPlayer, setSelectedPlayer] = useState({
  //   score: 0,
  //   name: ""
  // })
  const socket = useContext(SocketProvider)
  
  // const data = {
  //   labels: players.map((p) => p.name),
  //   datasets: [
  //     {
  //       label: '# of Votes',
  //       data: players.map((p) => p.score),  
        
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(255, 206, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //       ],
  //       borderColor: [
  //         'rgba(255, 99, 132, 1)',
  //         'rgba(54, 162, 235, 1)',
  //         'rgba(255, 206, 86, 1)',
  //         'rgba(75, 192, 192, 1)',
  //         'rgba(153, 102, 255, 1)',
  //         'rgba(255, 159, 64, 1)',
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  useEffect(() => {
    //Whenever players have been updated, the event will be emitted to socket.io
    socket.emit("update-players", players)
  }, [players])
  
  const api = new ApiClient();

  //post req unfinished
 
  function submitFormHandler (event) {
    event.preventDefault();
    api.postFilledForm(players)
  }

  //create a component for one question and result
  //bring selectedplayer and map function there
  //



  return (
    <div className="form-container">
      <form className={style["form"]} onSubmit={submitFormHandler}>
      <h2 id='formT'>{title}</h2>
     
      {questions.map((qn) => (
        <FormQuestion qn={qn} players={players}/>
        
      ))
      }
        {/* <button type='submit'> SAVE RESPONSES</button>  HAHAHA BUTTON DOESNT WORK*/}
      </form>
              
    </div>
  )
}
