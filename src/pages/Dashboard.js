import React from 'react';
import {Link} from 'react-router-dom';
import {GrAddCircle} from 'react-icons/gr';

export default function Dashboard({title}) {
  return (
    <div>
      <h2>My games</h2>
      <Link to='/players'> <GrAddCircle/></Link>
      <Link to='/form'>{title}</Link>

    </div>
  )
}
