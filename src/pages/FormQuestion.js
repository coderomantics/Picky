import React, {useState, useContext, useEffect} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import { SocketProvider } from '../App';

import '../css/FormQuestion.css'


ChartJS.register(ArcElement, Tooltip, Legend);

export default function FormQuestion({qn, players}) {
  const socket = useContext(SocketProvider);
  const [clonePlayers, setClonePlayers] = useState(players.map((p) => ({
    name: p.name,
    score: 0
  })))

  const [selectedPlayer, setSelectedPlayer] = useState({
    name: '',
    score: 0
  }) 
  
  useEffect(() => {
    //Whenever players have been updated, the event will be emitted to socket.io
    socket.emit("update-vote", selectedPlayer)
  }, [selectedPlayer])

  // const submitVote = () => {
  //   socket.emit('submitVote', toggleVoteHandler)
  // } //then put submitVote in onclick
 
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
      
      <p className="questionT">{qn.title}</p>
          <ul className='options'>
          {clonePlayers.map((p, i) =>
            <li className='option' key={p.name}>
            <label className="label">
             <input className="vote-button"
               type='radio'
               name={qn.title}
               value={p.name}
   
               onClick={(event) => {
                 const elem = event.target
                 //Name of the newly selected player
                 const value = elem.value
                 console.log('hi')

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
         <div className='doughnut'>
         {selectedPlayer && <Doughnut data={data} width={"200px"} height={"200px"} options={{ maintainAspectRatio: false }}/>} 
         </div>
          
      
            
        
    
     
           
       
      
          

        
    </>
  )
}