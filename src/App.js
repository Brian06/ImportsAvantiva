import React, { Component } from 'react';
import './App.css';
import Header from './containers/header/header.container';
import Login from './containers/login/login.container';
import ProjectDetail from './containers/projectDetail/projectDetail.container';
import ProjectList from './components/projectList/projectList.component';
import ImportProject from './components/importProject/importProject.component';
import Home from './components/home/home.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
