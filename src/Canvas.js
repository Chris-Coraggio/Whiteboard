import React from 'react'
import { NavLink } from 'react-router-dom'

const Canvas = ({ canvas }) => {
  return(
      <li>
          <div className="canvas">
            <div className="canvas-title">
              {canvas.title}
            </div>
            <div className="canvas-body">

            </div>
          </div>
      </li>
  )
}

export default Canvas