import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Layers/Pages/Home'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='*' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
