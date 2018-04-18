import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar'
import CanvasList from './CanvasList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <CanvasList />
      </div>
    );
  }
}

export default App;
