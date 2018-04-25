import React, { Component } from 'react'
import './SignIn.css'

class SignIn extends Component {
    constructor(){
        super()
        
        this.state = {
            user: "",
            pass: "",
        }
    }

    authenticate = () => {
        console.log("user: ${this.state.user}")
        console.log("pass: ${this.state.pass}")
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
