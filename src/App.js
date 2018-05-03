import React, { Component } from 'react';
import './App.css';
import Header from './containers/header/header.container';
import Login from './containers/login/login.container';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Route exact={true} path="/" component={Header}/>
        <Route path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
