import React from 'react'

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