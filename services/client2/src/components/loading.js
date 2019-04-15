import React from 'react';
import cthulhu from '../images/cthulhu(1).svg';

export default function LoadingScreen(props) {
  return (
    <div className="section">
        <br/>
      <div className="loading-icon-container row">
        <img className='glitch col-xs-12' height='200px' src={cthulhu} />
      </div>
    </div>
  )
}
