import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/navbar.jsx'
import MainContainer from './container/MainContainer.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <MainContainer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))