import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {GrAddCircle} from 'react-icons/gr';
import io from 'socket.io-client';
import '../css/Dashboard.css';


const socket = io('http://127.0.0.1:3008');
export default function Dashboard({title}) {
  const [isConnected, setIsConnected] = useState(socket.connected);

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
    <>
    <div id='game-header'>
      <h2>My games</h2>
      
      
      <Link to='/players'> <GrAddCircle id='add-btn'/></Link>
      <Link to='/form'>{title}</Link>
      <p>Connected: {'' + isConnected}</p>
    </div>
    </>
  )
}
