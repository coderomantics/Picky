import React, {useState} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import style from '../css/Form.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FormQuestion({qn, players}) {
  const [clonePlayers, setClonePlayers] = useState(players.map((p) => ({
    name: p.name,
    score: 0
  })))

  const [selectedPlayer, setSelectedPlayer] = useState({
    name: '',
    score: 0
  })
 
  const data = {
    labels: clonePlayers.map((p) => p.name),
    datasets: [
      {
        label: '# of Votes',
        data: clonePlayers.map((p) => p.score),  
        
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

  return (
    <>
      <h3 className="questionT">{qn.title}</h3>
          <ul className={style["player-list"]}>
          {clonePlayers.map((p, i) =>
            <li key={p.name}>
            <label className="label">
             <input className="vote-button"
               type='radio'
               name={qn.title}
               value={p.name}
   
               onClick={(event) => {
                 const elem = event.target
                 //Name of the newly selected player
                 const value = elem.value

                 setClonePlayers((prev) => {
                   
                   const cloned = [...prev]
                   console.log('see cloned', cloned)
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
  )
}