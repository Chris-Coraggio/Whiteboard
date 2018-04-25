import React, { Component } from 'react'
import './CanvasForm.css'

class CanvasForm extends Component {
    componentWillReceiveProps(nextProps){
        const newID = nextProps.match.params.id

        if(newID) {
            if(newID !== this.props.current.id){
                const canvas = nextProps.canvases[newID]
                if(canvas){
                    this.props.setCurrent(canvas)
                } else if (Object.keys(nextProps.canvases).length > 0){
                    this.props.history.push('/canvases')
                }
            }
        } else if (this.props.current.id) {
            this.props.resetCurrent()
        }
    }

    handleChanges = (ev) => {
        const canvas = {...this.props.current}
        canvas['title'] = ev.target.value
        this.props.save(canvas) 
    }

    render() {
        return (
            <div className="CanvasForm">
                <form>
                    <p>
                        <input type = "text"
                               name = "title"
                               placeholder = "Canvas Title"
                               onChange={this.handleChanges}
                               value = {this.props.current.title}
                        />
                    </p>
                    <canvas id="canvas-drawable"> </canvas>
                </form>
            </div>
        )
    }
}

export default CanvasForm