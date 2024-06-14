import React from "react";

import Overlay from "./overlay.jsx";



class Task extends React.Component {
    
    constructor(props)
    {
        super(props);

        this.state = {
            isVisible: this.props.isVisible
        };
    }

    
    HideElement = () => {
        this.setState({isVisible: this.state.isVisible === false ? true : false});
    };
    
    render()
    {
        const {isVisible} = this.state;
        return(
            <div class = "task-main">
                <div class= "task">
                    <h3 onClick={this.HideElement}>{this.props.name}</h3>
                    <p class={this.props.timeStyle}>Потрачено времени: </p>
                    <p class={this.props.timeStyle}>{this.props.spentTime}</p>
                    <h4 class = {this.props.isDoneStyle} >{this.props.isDone}</h4>
                </div>
                <Overlay isVisible={isVisible} desc={this.props.desc} exptTime={this.props.exptTime}/>              
            </div>
        )
    }
}

Task.defaultProps = {
    name: "Работа", 
    spentTime: "0 ч. 0 мин.",
    timeStyle: "norm-time", 
    isDone: "Закончить", 
    isDoneStyle : "acssept",
    desc: "Nullam vel massa sed lacus fringilla laoreet sed at mauris. Nunc at dapibus eros. Aliquam pharetra ligula nec fringilla tincidunt. Nulla vestibulum orci id tristique commodo. Duis tristique pulvinar ante, id maximus eros. Sed posuere vitae eros non hendrerit. Nulla euismod mauris eu sapien bibendum, nec luctus velit aliquet. Curabitur id lectus suscipit, feugiat neque in, pharetra ligula. Donec rutrum turpis mi, eget malesuada eros gravida vitae. Phasellus blandit pretium leo sed suscipit. Sed commodo cursus suscipit. Integer vitae tellus sem. Donec nibh arcu, pretium a convallis non, venenatis posuere nibh. Donec sagittis ultricies erat, ac ultrices purus. In hac habitasse platea dictumst.",
    exptTime: "0 ч. 0 мин.",
    isVisible: false
}

export default Task;