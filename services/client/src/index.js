import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, withRouter, Redirect } from 'react-router-dom';
import './css/bfx.css';
import './css/buix.css';
import './css/butch.css';
import './css/core.css';
import './css/default.css';
import './css/flavors.css';
import './css/animations.css';
import './css/rebar.css';
import App from './App'
import Login from './Login';
import User from './store/User'
import Home from './Home';
import LogOff from './components/Logoff';
import GroupsView from './components/GroupsView';

function Main() {
  return (
  <User>
    <div className="bubble-gum-grape-gradient" style={{'height':'100vh'}}>
        <BrowserRouter>
            <App >
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/login/" component={Login} />
                <Route path="/create-new/" render={(props) => <Login createnew={true} />
                  } />
                <Route path="/logoff/" component={LogOff} />
                <Route path="/my-groups/" component={GroupsView} />
              </div>
            </App>

        </BrowserRouter>
    </div>
  </User>
  )
}



ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
