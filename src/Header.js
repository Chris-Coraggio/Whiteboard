import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <nav className="Header">
      <div className="logo">
         
      </div>
      <h2>WhiteBoard</h2>
      
      <div className = "buttons">
        <button className="AddNote">
          Add Note
        </button>
        <button className="Join">
          Join
        </button>
        <button className="Create">
          Create
        </button>
        <select className="Dropdown">
          <option value="show history??"> history </option>
        </select>
      </div>
    </nav>
  )
}

export default Header