import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import Main from './Main'

class App extends Component {
  constructor() {
    super();
    this.state = {
      canvases: {
        'canvas-1': {
          id: "canvas-1",
          title: 'Test Canvas',
        },
      },
    }
  }

  addCanvas = (canvas) => {
    if(!canvas.id) {
      canvas.id = `canvas-${new Date()}`
    }
    const canvases = {...this.state.canvases}
    canvases[canvas.id] = canvas
    this.setState({ canvases })
  }

  render() {
    return (
      <div className="App">
        <Main canvases={this.state.canvases} 
          addCanvas={this.addCanvas}/>
      </div>
    );
  }
}

export default App;
