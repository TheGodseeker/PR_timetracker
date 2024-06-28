import React from "react";

import Overlay from "./overlay.jsx";
import GapsCard from "./gapsCard.jsx";


class Task extends React.Component {
    
    constructor(props)
    {
        super(props);

        this.state = {
            gapsData : null,
            error: null,
            isPlaying : false,
            isVisible: this.props.isVisible
        };
    }
    componentDidMount()
    {
        let request = `http://localhost:5129/Gaps/GetTimeGaps?taskID=${this.props.taskId}` 
        console.log(request)

        fetch(request)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => this.setState({ gapsData: data}))
        .catch(error => this.setState({ error: error}));

    }

    getGaps()
    {
        let request = `http://localhost:5129/Gaps/GetTimeGaps?taskID=${this.props.taskId}` 
        console.log(request)

        fetch(request)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => this.setState({ gapsData: data}))
        .catch(error => this.setState({ error: error}));

  

        

    }

    CompleteTask = () => {
        fetch(`http://localhost:5129/Tasks/CompleteTask?taskID=${this.props.taskId}`, {
            method: 'PUT'
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
            window.location.reload()
        })
    };
 
    SetEndTG = (gapId, status) => {
        
        let request = `http://localhost:5129/Gaps/UpdateEndTimeGap?gapId=${gapId}&isAct=${status}`
        
        console.log(request)

        fetch(request, {
            method: 'PUT'
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
            
            // window.location.reload()
        })
        .catch(error => console.error(error));
    }

    HideElement = () => {
        this.setState({isVisible: this.state.isVisible === false ? true : false});
    };
    
    SetStartTG = () =>
    {
        // this.state.isPlaying = true
        this.setState({isPlaying: true})
        
        let request = `http://localhost:5129/Gaps/AddTimeGap?taskID=${this.props.taskId}` 

        console.log(request)

        fetch(request, {
            method: 'PUT'
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
        })

        this.getGaps();
    }

    SetPause = () =>
    {


        this.setState({isPlaying: false})
        
        let request = `http://localhost:5129/Gaps/SetTimeGapEnd?taskID=${this.props.taskId}` 

        console.log(request)

        fetch(request, {
            method: 'PUT'
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
        })     


    }
    render()
    {
        const {isVisible, gapsData, error, isPlaying} = this.state;

        let gapId = null


        for (let gap in gapsData)
            {
                console.log(gapsData)
                if(gapsData[gap]['taskId'] === this.props.taskId)
                    {
                        if(gapsData[gap]['isActive'])
                            {
                                gapId = gap

                            }
                    }
            }

        console.log(gapId)

        return(
            <div class = "task-main">
                <div class= "task">
                    <h3 onClick={this.HideElement}> {isVisible ? '▲' : '▼'} {this.props.name}</h3>
                    <p class={this.props.timeStyle}>Потрачено времени: </p>
                    <p class={this.props.timeStyle}>{this.props.spentTime}</p>
                    <h4 class="add-bt" onClick={isPlaying ? this.SetPause :this.SetStartTG}>{isPlaying ? "Пауза" : "Старт"}</h4>
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