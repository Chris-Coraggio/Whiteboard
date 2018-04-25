import React from 'react'
import { Switch, Route } from 'react-router-dom'
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
            <Switch>
                <Route path="/canvases/:id" render={() => (
                    <CanvasForm addCanvas={props.addCanvas}/>
                )} />
                <Route path="/canvases" render={() => (
                    <CanvasForm addCanvas={props.addCanvas}/>
                )} />
            </Switch>
          </div>
        </div>
    )
}

export default Main