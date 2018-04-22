import React from 'react'
import Canvas from './Canvas'
import './CanvasList.css'

const CanvasList = ({ canvases }) => {
    return (
        <div className="CanvasList">
            <h3>Your Canvases</h3>
            <ul id="canvases">
                {Object.keys(canvases).map((canvasName) => {
                    return <Canvas canvas={canvases[canvasName]}/>
                })}
            </ul>
        </div>
    )
}

export default CanvasList