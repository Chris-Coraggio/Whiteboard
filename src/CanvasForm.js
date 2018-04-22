import React, { Component } from 'react'
import './CanvasForm.css'

class CanvasForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            canvas: this.newCanvas(),
        }
    }

    newCanvas = () => {
        return {
            id: null,
            title: '',
        }
    }

    handleChanges = (ev) => {
        const canvas = {...this.state.canvas}
        canvas['title'] = ev.target.value
        this.setState({ canvas }, 
            () => this.props.addCanvas(this.state.canvas))   
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
                               value = {this.state.canvas.title}
                        />
                    </p>
                    <p>
                        (Canvas goes here)
                    </p>
                </form>
            </div>
        )
    }
}

export default CanvasForm