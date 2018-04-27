import React, { Component } from 'react'
import PubNubReact from 'pubnub-react';
import './CanvasForm.css'

class CanvasForm extends Component {
    componentWillReceiveProps(nextProps){
        const newID = nextProps.match.params.id;

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

    constructor(props) {
        super(props)

        this.state = {
            canvas: React.createRef(),
            plots: [],
            isActive: false,
            occupancy: 1,
            currentBoardTitle: "Test"
        }

        this.pubnub = new PubNubReact({
            publish_key: 'pub-c-fdea4d55-93be-4473-96c6-83b19bcdedd2',
            subscribe_key: 'sub-c-4000d272-48bb-11e8-baa8-3e57c26d13ec',
            ssl: true,
            logVerbosity: true,
            uuid: "demo"
        });
        this.pubnub.init(this);
    }

    draw = (e) =>{
        if(!this.state.isActive) return;

        e = e.nativeEvent;

        //console.log(e);

        var rect = this.refs.canvas.getBoundingClientRect();

        //console.log(rect);

        // cross-browser canvas coordinates
        var x = e.offsetX //|| e.layerX - this.state.canvas.offsetX;
        var y = e.offsetY //|| e.layerY - this.state.canvas.offsetY;

        //console.log(x, y);

        this.state.plots.push({x: x, y: y});

        this.drawOnCanvas(this.state.plots);
    }

    drawFromDataStream = (stream) => {
        //take data from the server and plot it

        if(!stream) return;
        this.drawOnCanvas(stream.plots);
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
        //console.log("Drawing!");
    }

    endDraw = () => {
        this.setState({isActive: false});

        //post the plot to the server
        //publish the plots
        this.publish(this.state.currentBoardTitle, this.state.plots);
        this.setState({plots: []});
        //console.log("Stopped drawing!");
    }

    publish = (board_name, plots) => {
        this.pubnub.publish({
            plots: plots,
            channel: board_name,
            message: "Yo"
        });
        console.log("Publishing");
        // console.log(board_name);
        // console.log(plots);
        // console.log(this.pubnub);
    }

    subscribe = () => {
       if(console.log(this.state.currentBoardTitle) === ""){
        console.log("No name");
        return;
    }
       this.pubnub.subscribe({
            channels: [this.state.currentBoardTitle],
            withPresence: true
        });

       this.pubnub.getMessage(this.state.currentBoardTitle, (msg) => {
            console.log("Received from room: " + msg);
            this.drawFromDataStream(msg.plots);
        });
    }

    handleChanges = (ev) => {
        const canvas = {...this.props.current}
        //console.log(this.props.current.title);
        this.setState({currentBoardTitle: this.props.current.title});
        this.subscribe(this.props.current.title);
        canvas['title'] = ev.target.value
        this.props.save(canvas)
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
                               value = {this.props.current.title}
                        />
                    </p>
                    <canvas ref="canvas" id="canvas-drawable" 
                        onMouseDown={this.startDraw.bind(this)} 
                        onMouseDown={this.startDraw.bind(this)} 
                        onMouseMove={this.draw.bind(this)} 
                        onMouseUp={this.endDraw.bind(this)}> 
                    </canvas>
                </form>
            </div>
        )
    }
}

export default CanvasForm