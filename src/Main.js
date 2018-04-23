import React from 'react'
import Sidebar from './Sidebar'
import CanvasList from './CanvasList'
import CanvasForm from './CanvasForm'
import './Main.css'
import SignIn from './SignIn';

const Main = (props) => {
    return (
        <div className = "Main">
          <Sidebar />
          <CanvasList canvases={props.canvases}/>
          <CanvasForm addCanvas={props.addCanvas}/>
          {/* <SignIn /> */}
        </div>
    )
}

export default Main