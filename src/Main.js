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
                <Route path="/canvases/:id" render={(navProps) => (
                    <CanvasForm {...props}
                        {...navProps}/>
                )} />
                <Route path="/canvases" render={(navProps) => (
                    <CanvasForm {...props}
                        {...navProps}/>
                )} />
            </Switch>
          </div>
        </div>
    )
}

export default Main