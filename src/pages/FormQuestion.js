import React, {useState, useContext, useEffect} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import { SocketProvider } from '../App';

import '../css/FormQuestion.css'


ChartJS.register(ArcElement, Tooltip, Legend);

export default function FormQuestion({qn, players, voteForPlayer}) {
  const socket = useContext(SocketProvider);
  // const [clonePlayers, setClonePlayers] = useState(players.map((p) => ({
  //   name: p.name,
  //   score: 0
  // })))

  const [selectedPlayer, setSelectedPlayer] = useState({
    name: '',
    score: 0
  }) 
  
  // useEffect(() => {
  //   //Whenever players have been updated, the event will be emitted to socket.io
  //   socket.emit("update-vote", clonePlayers)
  // }, [clonePlayers])

  

  
  // } //then put submitVote in onclick
  const toggleVoteHandler = (event) => {
    // const elem = event.target.value
    //Name of the newly selected player
    
    const value = event.target.value
    voteForPlayer(qn, value)

    //Set the selected player and render the donut
    setSelectedPlayer(players.find((player) => player.name === value))
    
  }

  // const submitVote = (e) => {
  //   socket.emit('submit-vote', toggleVoteHandler(e))
  // }

  // socket.on('votes-update-broadcast', (data) => {
  //   setClonePlayers(data);
  //   console.log('score', data)
  // })

  // console.log(clonePlayers)
  
 
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

  return (
    <>
      <div className='card'>
      <p className="questionT">{qn.title}</p>
          <ul className='options'>
          {players.map((p, i) => {
            return <li className='option' key={p.name}>
              <label className="label">
              <input className="vote-button"
                type='radio'
                name={qn.title}
                value={p.name}
    
                onClick={(e) => {toggleVoteHandler(e)}}
        
                required />
              {p.name}
            </label>
            </li>
            }
          )}   
         </ul>
         <div className='doughnut'>
         {selectedPlayer && <Doughnut data={data} width={"400px"} height={"400px"} options={{ maintainAspectRatio: false }}/>} 
         </div>
      </div> 
      
          
      
            
        
    
     
           
       
      
          

        
    </>
  )
}