import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import '../css/Dashboard.css';
import { SocketProvider } from '../App';
import Tippy from '@tippyjs/react';





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
  
    <div className='pick-container'>
      <div className='pics'>
          <img id='eyeball' src='/eyeball2.png' alt='img'/>
          <Link style={{height: 'fit-content'}} to='/players'>
            <Tippy content='Create new game' placement='top' className='tippy-pink'>
              <img id='new-game-btn'
                // src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/555429/donut.svg'
                src='/donut.png'
                alt='+'
              /> 
            </Tippy>
            
          </Link> 
          <img id='mushroom' src='/enoki.png' alt='img'/>
       
            <img id='cactus' src='/cactus.png' alt='img'/>

       
          
          <img id='gem' src='/gem.png' alt='img'/>
          <img id='bears' src='/gummybears.png' alt='img'/>
          <div className='link'>
          
            <Link style={{height: '300px'}} to='/form'>  
            <Tippy content="Go to game" className='tippy-red'>
              <img id='my-game-btn'
              src='/heart.png'
              alt={title}
              />
            </Tippy>
            </Link>
            
          </div>        
      </div>
      <p style={{height: 'fit-content'}}>Connected: {'' + isConnected}</p>
    </div>
    
  )
}
