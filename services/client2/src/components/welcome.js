import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome(props) {
  return (
    <div>
      <h1>Here we are in Welcome</h1>
      <nav>
        <Link to='/create-new'>create new list</Link>
      </nav>
    </div>
  )
}
