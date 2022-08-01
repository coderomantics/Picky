import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {GrAddCircle} from 'react-icons/gr';
import io from 'socket.io-client';
import '../css/Dashboard.css';
import { SocketProvider } from '../App';




export default function Dashboard({title}) {
  const socket = useContext(SocketProvider);
  const [isConnected, setIsConnected] = useState(socket.connected);
  //just testing socket connection not an actual functionality of app 
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log(isConnected)
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    }
  }, [])

  return (
  
    <div id='game-header'>
    
      {/* <GrAddCircle id='add-btn'/> */}
      <div className='pics'>
      <img id='eyeball' src='/eyeball2.png' alt='img'/>
      <Link style={{height: 'fit-content'}} to='/players'>
        <img id='new-game-btn'
          // src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/555429/donut.svg'
          src='/donut.png'
          alt='+'
        /> 
      </Link> 
       <img id='mushroom' src='/enoki.png' alt='img'/>
       <img id='cactus' src='/cactus.png' alt='img'/>
       <img id='gem' src='/gem.png' alt='img'/>
       <img id='bears' src='/gummybears.png' alt='img'/>
       <Link style={{textDecoration: 'none', color: 'pink', height: 'fit-content'}} to='/form'>
        <img id='my-game-btn'
          src='/heart.png'
          alt={title}
        />
       </Link>
     
       
      </div>
      
      {/* <Link style={{textDecoration: 'none', color: 'pink', height: 'fit-content'}} to='/form'>{title}</Link> */}
      <p style={{height: 'fit-content'}}>Connected: {'' + isConnected}</p>
    </div>
    
  )
}
