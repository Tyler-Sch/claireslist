import React from 'react';
import { Link } from 'react-router-dom';
import CreateNewList from './newList';
import WelcomeText from './welcomeText';

export default function Welcome(props) {


  return (
    <div className='container'>
      <CreateNewList />
      <WelcomeText />
    </div>
  )
}
