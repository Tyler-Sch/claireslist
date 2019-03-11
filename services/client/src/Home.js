import React from 'react';
import { userContext } from './store/User';


export default function Home(props) {
  return (
    <div className="container">
      <br/>
      <p className="circle-text"><span className="glitch">Do</span>Do you and all of your friends really need your own belt sander???
        How many times have you used that 90 lb stand mixer sitting on your
        counter???
      </p>
      <p>Probably not enough, <span className="glitch">AMIRITE???</span></p>
      <br/>
      <p>So maybe you should take some time and tell your friends about all the
        <span className="bigger"> extra</span> stuff you have so they can
        share it with you.</p>
      <br/>
      <p>Maybe they'll share some stuff with you too</p>

    </div>
  )
}
