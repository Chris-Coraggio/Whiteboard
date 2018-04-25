import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <nav className="Header">
      <div className="logo">
         
      </div>
      <h2>WhiteBoard</h2>
      
      <div className = "buttons">
        <button className="Join">
          Join
        </button>
        <button className="Create">
          Create
        </button>
        <button className="History">
          History
        </button>
        <button className="SignOut">
          SignOut
        </button>
      </div>
    </nav>
  )
}

export default Header