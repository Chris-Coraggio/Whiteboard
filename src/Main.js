import React from 'react'
import Header from './Header'
import CanvasList from './CanvasList'
import CanvasForm from './CanvasForm'
import './Main.css'

const Main = (props) => {
    return (
        <div className = "Main">
          <Header />
          <div className = "Content">
              <CanvasList canvases={props.canvases}/>
              <CanvasForm addCanvas={props.addCanvas}/>
          </div>
        </div>
    )
}

export default Main