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
import CreateNew from './components/createGroup/createNew';
import Welcome from './components/welcomeView/welcome';
import Title from './components/base/title';
import PageView from './components/mainview/pageView';
function App() {

  return (
    <div className='bubble-gum-grape-gradient'
      style={{
        'minHeight':'100vh',
        'position': 'absolute',
        'minWidth': '100vw'
      }}>
      <BrowserRouter>
        <Title />
        <div className="body">
          <div className="paths">
            <Route path="/" exact component={Welcome} />
            <Route path="/create-new" component={CreateNew} />
            <Route path="/group/:id" component={PageView} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
