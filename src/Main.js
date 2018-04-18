import React from 'react'
import Sidebar from './Sidebar'
import CanvasList from './CanvasList'
import CanvasForm from './CanvasForm'
import './Main.css'

const Main = () => {
    return (
        <div className = "Main">
          <Sidebar />
          <CanvasList />
          <CanvasForm />
        </div>
    )
}

export default Main