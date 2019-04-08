import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CreateNew from './components/createNew';
import Welcome from './components/welcome';
function App() {

  return (
    <div>
      <BrowserRouter>
        <div className="title">
          <h1>Claire's List</h1>
        </div>
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
