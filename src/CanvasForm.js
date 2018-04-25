import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './CanvasForm.css'

class CanvasForm extends Component {
    constructor(props){
        super(props)

        this.state = {
            canvas: React.createRef(),
            plots: [],
            isActive: false
        }

        //somehow get context
    }

    newCanvas = () => {
        return {
            id: null,
            title: '',
        }
    }

    // handleChanges = (ev) => {
    //     const canvas = {...this.state.canvas}
    //     canvas['title'] = ev.target.value
    //     this.setState({ canvas }, 
    //         () => this.props.addCanvas(this.state.canvas))   
    // }

    draw = (e) =>{
        if(!this.state.isActive) return;

        e = e.nativeEvent;

        console.log(e);

        var rect = this.refs.canvas.getBoundingClientRect();

        console.log(rect);

        // cross-browser canvas coordinates
        var x = e.screenX; //e.offsetX //|| e.layerX - this.state.canvas.offsetX;
        var y = e.screenY; //e.offsetY //|| e.layerY - this.state.canvas.offsetY;

        console.log(x, y);

        this.state.plots.push({x: x, y: y});

        this.drawOnCanvas(this.state.plots);
    }

    drawOnCanvas = (color) => {
        //this.context is the canvas object thanks to the ref field in the canvas element
        //not sure what color does
        var node = this.refs.canvas;
        var context = node.getContext('2d');
        context.beginPath();
        context.moveTo(this.state.plots[0].x, this.state.plots[0].y);

          for(var i=1; i<this.state.plots.length; i++) {
            context.lineTo(this.state.plots[i].x, this.state.plots[i].y);
          }
          context.stroke();
    }

    startDraw = () => {
        this.setState({isActive: true});
        console.log("Drawing!");
    }

    endDraw = () => {
        this.setState({isActive: false});

        //post the plot to the server
        this.setState({plots: []});
        console.log("Stopped drawing!");
    }

    render() {
        //ref={(c) => this.context = c.getContext('2d')}
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
                    <canvas ref="canvas" id="canvas-drawable" context=""onMouseDown={this.startDraw.bind(this)} onMouseMove={this.draw.bind(this)} onMouseUp={this.endDraw.bind(this)}> </canvas>
                </form>
            </div>
        )
    }
}

export default CanvasForm