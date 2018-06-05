import { React, Component } from 'react';
import Header from '../../containers/header/header.container'
import './home.component.css';

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