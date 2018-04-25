import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({signOut}) => {
  return (
    <nav className="Header">
      <div className="logo">
         
      </div>
      <h2>WhiteBoard</h2>
      
      <div className = "buttons">
        <Link to="/canvases" className="new-canvas">
          <button className="Create">
            Create
          </button>
        </Link>
        <button className="Join">
          Join
        </button>
        <button className="History">
          History
        </button>
        <button className="SignOut" onClick={signOut}>
          SignOut
        </button>
      </div>
    </nav>
  )
}

export default Header