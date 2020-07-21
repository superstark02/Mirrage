import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Layers/Pages/Home'
import AppBar from './Layers/Components/AppBar/AppBar';
import Login from './Layers/Pages/Login';
//this is comment
function App() {
  return (
    <div>
      <Router>
        <div>
          <AppBar/>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-in' component={Login} />
          <Route exact path='*' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
