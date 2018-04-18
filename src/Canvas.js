import React from 'react'

const Canvas = (props) => {
  return(
      <li>
          <div className="canvas">
            <div className="canvas-title">
              {props.canvas.title}
            </div>
          </div>
      </li>
  )
}

export default Canvas