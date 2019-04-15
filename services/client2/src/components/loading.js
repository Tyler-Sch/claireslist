import React from 'react';
import cthulhu from '../images/cthulhu(1).svg';

export default function LoadingScreen(props) {
  return (
    <div className="section">
        <br/>
      <div className="loading-icon-container row">
        <img className='throb col-xs-12' height='250px' src={cthulhu}
            alt='loading icon' />
      </div>
    </div>
  )
}
