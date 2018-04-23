import React from 'react'
import './SignIn.css'

const SignIn = () => {
    const authenticate = () => {

    }

    return (
        <div className="border">
            <h3>Welcome to Whiteboard</h3>
            <button className="SignIn Button" onClick = {() => authenticate}>
                Sign In Here
            </button>
        </div>
    )
}

export default SignIn
