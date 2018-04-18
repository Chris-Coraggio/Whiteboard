import React from 'react'
import Canvas from './Canvas'
import './CanvasList.css'

const CanvasList = (props) => {
    return (
        <div className="CanvasList">
            <h3>Your Canvases</h3>
            <ul id="canvases">
                {Object.keys(props.canvases).map((canvasName) => {
                    return <Canvas canvas={props.canvases[canvasName]}/>
                })}
            </ul>
        </div>
    )
}

export default CanvasList