import React from "react";

import Overlay from "./overlay.jsx";
import GapsCard from "./gapsCard.jsx";


class Task extends React.Component {
    
    constructor(props)
    {
        super(props);

        this.state = {
            isVisible: this.props.isVisible
        };
    }


    CompleteTask = () => {
        fetch(`http://localhost:5129/TimeTracker/CompleteTask?taskID=${this.props.taskId}`, {
            method: 'PUT'
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
            window.location.reload()
        })
    };
    
    HideElement = () => {
        this.setState({isVisible: this.state.isVisible === false ? true : false});
    };
    
    render()
    {
        const {isVisible} = this.state;
        return(
            <div class = "task-main">
                <div class= "task">
                    <h3 onClick={this.HideElement}> {isVisible ? '▲' : '▼'} {this.props.name}</h3>
                    <p class={this.props.timeStyle}>Потрачено времени: </p>
                    <p class={this.props.timeStyle}>{this.props.spentTime}</p>
                    <h4 class="add-bt">Старт</h4>
                    <h4 class = {this.props.isDoneStyle} onClick={this.props.isDoneStyle === "acssept"? this.CompleteTask : null}>{this.props.isDone}</h4>
                </div>
                <Overlay isVisible={isVisible} desc={this.props.desc} exptTime={this.props.exptTime}/>
                <GapsCard isVisible={isVisible} taskID={this.props.taskId}/>
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
    desc: "Описание отсутствует.",
    exptTime: "0 ч. 0 мин.",
    isVisible: false,
    taskId: null
}

export default Task;