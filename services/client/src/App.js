import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from './store/User';

export default function App(props) {
  const { loggedIn } = useContext(userContext);


  return (

    <div>
      <div className="red">
        <div className="blood-black-gradient">
          <h1 className="fittext brutal-text-neon lime-text">Claire s list</h1>
          <div className="scroller-wrapper" style={{'height': '50px'}}>
            <div className="scroll-left">
              <div className="scroll-item honey">
                <p>got too much stuff.....</p>
              </div>
              <div className="scroll-item pool-water">
                <p>Maybe you should...........................</p>
              </div>
              <div className="scroll-item rainbow">
                <p className='blood-orange'>SHARE IT WITH FRIENDS!</p>
              </div>
            </div>
          </div>
        </div>

          <ul className="simple-nav animate-bg-shine">
            <li><Link to="/" className="glitch">Home</Link></li>
            {
              (loggedIn)
              ? (<div><li><Link to="/logoff/">Log Off</Link></li>
                  <li><Link to="/my-groups/">my groups</Link></li>
                  </div>
                )
              : <li><Link to="/login/">Log me in</Link></li>

            }
            <li>Nothing here yet</li>
          </ul>
      </div>
      {props.children}
  </div>
  )
}
