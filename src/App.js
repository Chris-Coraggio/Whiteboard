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

  render() {
    return (
      <div className="App">
        <Main canvases={this.state.canvases}/>
      </div>
    );
  }
}

export default App;
