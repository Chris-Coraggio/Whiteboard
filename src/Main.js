import React from 'react'
import Sidebar from './Sidebar'
import CanvasList from './CanvasList'
import CanvasForm from './CanvasForm'
import './Main.css'

const Main = (props) => {
    return (
        <div className = "Main">
          <Sidebar />
          <CanvasList canvases={props.canvases}/>
          <CanvasForm addCanvas={props.addCanvas}/>
        </div>
    )
}

export default Main