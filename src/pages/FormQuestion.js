import React, {useState, useContext} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import { SocketProvider } from '../App';

import '../css/FormQuestion.css'

const calculateScoreFromVotes = (qn, players) => {
  const cloned = [...players.map(({ name }) => ({
    name,
    score: 0
  }))]

  // Example input in qn.votes
  // votes = [{
  //   name: "foo"
  // }, {
  //   name: "bar"
  // }, {
  //   name: "foo"
  // }]
  for (const vote of qn.votes) {
    const index = cloned.findIndex((r) => {
      return r.name === vote.name
    })

    if(index !== -1){
      cloned[index].score = cloned[index].score + 1
    }
  }

  // Expected output
  // [{
  //   name: "foo",
  //   score: 2
  // }, {
  //   name: "bar",
  //   score: 1
  // }]

  return cloned 
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function FormQuestion({qn, players, voteForPlayer}) {
  const socket = useContext(SocketProvider);
  
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
  
  const data = {
    labels: calculateScoreFromVotes(qn, players).map((p) => p.name),
    datasets: [
      {
        label: '# of Votes',
        data: calculateScoreFromVotes(qn, players).map((p) => p.score),  
        
        backgroundColor: [
          'rgba(115, 210, 222)',
          'rgba(33, 131, 128)',
          'rgba(143, 45, 86)',
          'rgba(216, 17, 89)',
          'rgba(255, 188, 66)',
        ],
        borderColor: [
          'rgba(115, 210, 222)',
          'rgba(33, 131, 128)',
          'rgba(143, 45, 86)',
          'rgba(216, 17, 89)',
          'rgba(255, 188, 66)',
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