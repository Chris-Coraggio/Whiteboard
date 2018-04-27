import React, { Component } from 'react'
import './SignIn.css'

class SignIn extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            user: '',
            pass: '',
            cookie: '',
        }
    }

    authenticate = async () => {
        //console.log("user: " + this.state.user)
        //console.log("pass: " + this.state.pass)
        const res = fetch(`/api/humanity?user=${this.state.user}&pass=${this.state.pass}`)
            .then(res => res.json().then(data => {
                console.log("data", JSON.stringify(data, null, 4));
                this.props.setUser(JSON.stringify(data.cookie, null, 4))
                //this.setState({cookie: JSON.stringify(data.cookie, null, 4)})
              }))
    }

    handleChangeUser = (ev) => {
        const user = ev.target.value
        this.setState({user})
    }

    handleChangePass = (ev) => {
        const pass = ev.target.value
        this.setState({pass})
    }

    render () {
        return (
            <div className="border">
                <h3>Welcome to Whiteboard</h3>
                <input type="text" 
                    name="username" 
                    placeholder="USERNAME"
                    onChange={this.handleChangeUser} 
                    value={this.state.user}/>
                <input type="password"
                    name="password"
                    placeholder="PASSWORD" 
                    onChange = {this.handleChangePass}
                    value={this.state.pass}/>
                <button className="SignIn Button" onClick = {this.authenticate}>
                    Sign In Here
                </button>

            </div>
        )
    }
}

export default SignIn
