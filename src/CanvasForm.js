import React, { Component } from 'react'
import './CanvasForm.css'

class CanvasForm extends Component {
    render() {
        return (
            <div className="CanvasForm">
                <form>
                    <p>
                        <input type = "text"
                               name = "title"
                               placeholder = "Canvas Title"/>
                    </p>
                    <p>
                        
                    </p>
                </form>
            </div>
        )
    }
}

export default CanvasForm