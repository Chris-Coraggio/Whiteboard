import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Main from './Main'
import SignIn from './SignIn';

class App extends Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      canvases: {},
      reponse: '',
      current: this.newCanvas(),
    }
  }
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  newCanvas = () => {
    return {
        id: null,
        title: '',
    }
  }

  addCanvas = (canvas) => {
    if(!canvas.id) {
      canvas.id = `canvas-${Date.now()}`
    }
    const canvases = {...this.state.canvases}
    canvases[canvas.id] = canvas
    this.setState({ 
      canvases,
      current: canvas,
     })
  }

  render() {
    const functions = {
      addCanvas: this.addCanvas,
    }
    const data = {
      canvases: this.state.canvases,
      current: this.state.current,
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/canvases" render={() => (
            <Main canvases={this.state.canvases} 
              addCanvas={this.addCanvas}/>
            //<p className="App-intro">{this.state.response}</p>
          )} />
          <Route path="/sign-in" render={() => (
            <SignIn />
          )} />
          <Route render={() => <Redirect to="/canvases" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
