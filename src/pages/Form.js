
import React, {useState, useContext, useEffect} from "react";
import { ApiClient } from "../apiClient";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import '../css/Form.css';
import { SocketProvider} from '../App';

ChartJS.register(ArcElement, Tooltip, Legend);




export default function Form({title, questions, players, setPlayers}) {

  const [selectedPlayer, setSelectedPlayer] = useState({
    score: 0,
    name: ""
  })
  const socket = useContext(SocketProvider)
  
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

  return (
    <div className="form-container">
      <form onSubmit={submitFormHandler}>
      <h2 id='formT'>{title}</h2>
      {questions.map((qn) => (
        <>
          <h3 className="questionT">{qn}</h3>
          <ul>
          {players.map((p, i) =>
            <li key={p.name}>
            <label className="label">
             <input className="vote-button"
               type='radio'
               name={qn}
               value={p.name}
   
               onClick={(event) => {
                 const elem = event.target
                 //Name of the newly selected player
                 const value = elem.value

                 setPlayers((prev) => {
                   console.log('cleaning up')
                   const cloned = [...prev]

                   //Reduce the score of the previously selected player by 1
                   const oldPlayerIndex = cloned.findIndex((player) => player.name === selectedPlayer.name)
                   if(oldPlayerIndex !== -1){
                     //selectedPlayer exists
                     const oldPlayer = cloned[oldPlayerIndex];
                     oldPlayer.score = oldPlayer.score > 0 ? oldPlayer.score - 1 : 0;
                     cloned[oldPlayerIndex] = oldPlayer
                   }

                   //Increse the score of the newly selected player by 1
                   const newPlayerIndex = cloned.findIndex((player) => player.name === value)
                   const newPlayer = cloned[newPlayerIndex]
                   newPlayer.score ++
                                       
                   cloned[newPlayerIndex] = newPlayer

                   return cloned
                 })

                 //Set the selected player and render the donut
                 setSelectedPlayer(players.find((player) => player.name === value))
               }}
       
               required />
             {p.name}
           </label>
           </li>
         )}   
         </ul>
      
         {selectedPlayer && <Doughnut data={data} width={"100vw"} height={"200px"} options={{ maintainAspectRatio: false }}/>}
            
        
    
     
           
       
      
          

        </>
      ))
      }
        {/* <button type='submit'> SAVE RESPONSES</button>  HAHAHA BUTTON DOESNT WORK*/}
      </form>
              
    </div>
  )
}
