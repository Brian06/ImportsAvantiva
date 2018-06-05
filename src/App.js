import React, { Component } from 'react';
import './App.css';
import Header from './containers/header/header.container';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <Header></Header>
        </div>
      </Router>
    );
  }
}

export default App;
