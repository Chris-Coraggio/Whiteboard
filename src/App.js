import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar'
import CanvasList from './CanvasList'
import CanvasForm from './CanvasForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <CanvasList />
        <CanvasForm />
      </div>
    );
  }
}

export default App;
