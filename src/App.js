import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Main from './Main'
import SignIn from './SignIn';

class App extends Component {
  constructor() {
    super();
    this.state = {
      canvases: {
      },
      reponse: ''
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
