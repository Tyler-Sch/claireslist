import './css/bfx.css';
import './css/buix.css';
import './css/butch.css';
import './css/core.css';
import './css/default.css';
import './css/flavors.css';
import './css/animations.css';
import './css/rebar.css';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CreateNew from './components/createNew';
import Welcome from './components/welcome';
import Title from './components/title';
function App() {

  return (
    <div className='bubble-gum-grape-gradient'
      style={{
        'min-height':'100vh',
        'position': 'absolute',
        'min-width': '100vw'
      }}>
      <BrowserRouter>
        <Title />
        <div className="body">
          <div className="paths">
            <Route path="/" exact component={Welcome} />
            <Route path="/create-new" component={CreateNew} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
