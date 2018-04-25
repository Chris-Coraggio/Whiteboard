import React from 'react'
import { NavLink } from 'react-router-dom'

const Canvas = ({ canvas }) => {
  return(
    <NavLink to={`/canvases/${canvas.id}`} >
      <li>
          <div className="canvas">
            <div className="canvas-title">
              {canvas.title}
            </div>
            <div className="canvas-body">
              
            </div>
          </div>
      </li>
    </NavLink>
  )
}

export default Canvas