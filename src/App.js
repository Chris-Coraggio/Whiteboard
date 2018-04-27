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

  signedIn = () =>{
    return (this.state.uid)
  }

  signOut = () => {
    //console.log("signing out!")
    this.setState({uid: null})
  }

  getUserFromLocalStorage = () => {
    const uid = localStorage.getItem('uid')
    if(!uid){
      return
    }
    this.setState({ uid })
  }

  setUser = (cookie) => {
    localStorage.setItem('uid', cookie)
    this.setState({ uid: cookie })
    console.log(this.state.uid)
  }

  save = (canvas) => {
    let redirect = false
    if(!canvas.id) {
      canvas.id = `canvas-${Date.now()}`
      redirect = true
    }
    const canvases = {...this.state.canvases}
    canvases[canvas.id] = canvas
    this.setState({ 
      canvases,
      current: canvas,
     })
     if(redirect){
       this.props.history.push(`/canvases/${canvas.id}`)
     }
     fetch(`/api/canvases?title=${canvas.title}&id=${canvas.id}`)
  }

  setCurrent = (canvas) => {
    this.setState({current: canvas})
  }

  resetCurrent = () => {
    this.setState({current: this.newCanvas()})
  }

  render() {
    const functions = {
      save: this.save,
      setCurrent: this.setCurrent,
      resetCurrent: this.resetCurrent,
      signOut: this.signOut,
      setUser: this.setUser,
    }
    const data = {
      canvases: this.state.canvases,
      current: this.state.current,
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/canvases" render={() => (
            this.signedIn() ? 
              <Main {...functions} 
                {...data}/>
              //<p className="App-intro">{this.state.response}</p>
              : <Redirect to="/sign-in" />
          )} />
          <Route path="/sign-in" render={() => (
            !this.signedIn() ?
              <SignIn {...functions}/>
              : <Redirect to="/canvases" />
          )} />
          <Route render={() => <Redirect to="/canvases" />} />
        </Switch>
      </div>
    );
  }
}

export default App;
