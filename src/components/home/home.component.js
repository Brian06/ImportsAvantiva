import React, { Component } from 'react';
import './home.component.css';
import Header from '../../containers/header/header.container'

class Home extends Component {

  render() {
    
    return (
      <div className="main">
        <Header></Header>
      </div>
    )
  }

}

export default Home;