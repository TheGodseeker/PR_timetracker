import React from "react";

import Overlay from "./overlay.jsx";
import GapsCard from "./gapsCard.jsx";


class Task extends React.Component {
    
    constructor(props)
    {
        super(props);

        

        this.state = {
            taskData: null,
            gapsData : null,
            error: null,
            isPlaying : false,
            isVisible: this.props.isVisible,
            spentTime: "0 ч. 0 мин. 0 сек.",
            timeStyle: "norm-time",
            expTimeTXT: "Не установлено."
        };
    }
    componentDidMount()
    {
        this.getTaskData()

        this.interval = setInterval(() => this.getGaps(), 1000) 

        
    }

    getTaskData()
    {

        fetch(`http://localhost:5129/Tasks/GetTask?taskID=${this.props.taskId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => this.setState({taskData: data}))
        .catch(error => this.setState({ error: error}));

        setTimeout(() => {
        
        const {taskData} = this.state
        
        var spentHours = Math.floor(taskData['spentTime']/3600000);
        var spentMinutes = Math.floor((taskData['spentTime'] - spentHours * 3600000)/60000);
        var spentSeconds = Math.floor(((taskData['spentTime'] - spentHours * 3600000) - spentMinutes * 60000)/1000)
        
        if (this.props.expTime != 0)
          {
            let expHours = Math.floor(taskData['expTime']/3600000)
            let expMinutes = Math.floor((taskData['expTime'] - expHours * 3600000 )/60000)
            let expSeconds = Math.floor(((taskData['expTime'] - expHours * 3600000) - expMinutes * 60000)/1000)

            this.setState({expTimeTXT: `${expHours} ч. ${expMinutes} мин. ${expSeconds} сек.`}) 
            
            if (taskData['spentTime'] > this.props.expTime)
                this.setState({timeStyle: "overdue"}) 
          } 

        this.setState({spentTime: `${spentHours} ч. ${spentMinutes} мин. ${spentSeconds} сек.`})
        }, 100)
    }

    getGaps()
    {
        let request = `http://localhost:5129/Gaps/GetTimeGaps?taskID=${this.props.taskId}` 
       

        fetch(request)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => this.setState({ gapsData: data}))
        .catch(error => this.setState({ error: error}))     
 
        // if (this.state.isPlaying)
        //     this.setState({isPlaying: false})

        setTimeout(() => {
        for(let gap in this.state.gapsData)
            {
                if (this.state.gapsData[gap]['isActive'])
                    {
                        if(!this.state.isPlaying)
                            this.setState({
                                isPlaying: true
                            })
                        console.log(this.state.gapsData[gap]['isActive'])
                        this.UpdateTimer()
                        this.getTaskData()
                        break
                    }
            }  
            // var lastValue = Object.keys(this.state.gapsData)[Object.keys(this.state.gapsData).length - 1] 

            // if (this.state.gapsData[lastValue]['isActive'])
            // {
            //     if(!this.state.isPlaying)
            //         this.setState({isPlaying: true})
            //     console.log(this.state.gapsData[this.state.gapsData.length - 1]['isActive'])
            //     this.UpdateTimer()
            //     this.getTaskData()
            // }

        }, 300)

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
 


    HideElement = () => {
        this.setState({isVisible: this.state.isVisible === false ? true : false});
    };
    
    SetStartTG = () =>
    {
       
        let request = `http://localhost:5129/Gaps/AddTimeGap?taskID=${this.props.taskId}` 

        // console.log(request)

        
            fetch(request, {
                method: 'PUT'
            })
                .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
            })
        

            this.setState({isPlaying: true})
        // 
        // this.getGaps();
    }


    /*
    TO-DO:
    
    При нажатии на кнопку "Пауза" на одной вкладке она не меняется 
    автоматом на кнопку "Старт" на другой. Только при
    перезагрузке страницы.
    */
    SetPause = () =>
    {
        this.setState({isPlaying: false})
        
        // let request = `http://localhost:5129/Gaps/SetTimeGapEnd?taskID=${this.props.taskId}` 
        var request = `http://localhost:5129/Gaps/FinishTimeGap?taskID=${this.props.taskId}`

        console.log(request)

        setTimeout(() => {
            
            fetch(request, {
                method: 'PUT'
            })
                .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
            })

            
    }, 100)     

        // this.getGaps()
    }

    UpdateTimer = () =>
        { 
            setInterval(() => {
                fetch(`http://localhost:5129/Gaps/SetTimeGapEnd?taskID=${this.props.taskId}&activeState=true`, {
                    method: 'PUT'
                })
                    .then(response => {
                        if (!response.ok) {
                          throw new Error('Network response was not ok');
                        }
                }) 
            }, 100)

        }


    render()
    {
        const {isVisible, taskData, expTimeTXT, isPlaying} = this.state;

        return(
            <div class = "task-main">
                <div class= "task">
                    <h3 onClick={this.HideElement}> {isVisible ? '▲' : '▼'} {this.props.name}</h3>
                    <p class={this.state.timeStyle}>Потрачено времени: </p>
                    <p class={this.state.timeStyle}>{this.state.spentTime}</p>
                    <h4 class="add-bt" onClick={isPlaying ? this.SetPause :this.SetStartTG}>{isPlaying ? "Пауза" : "Старт"}</h4>
                    <h4 class = {this.props.isDoneStyle} onClick={this.props.isDoneStyle === "acssept"? this.CompleteTask : null}>{this.props.isDone}</h4>
                </div>
                <Overlay isVisible={isVisible} desc={this.props.desc} exptTime={expTimeTXT}/>
                <GapsCard isVisible={isVisible} taskID={this.props.taskId}/>
            </div>
        )
    }
}

Task.defaultProps = {
    name: "Работа", 
    isDone: "Закончить", 
    isDoneStyle : "acssept",
    desc: "Описание отсутствует.",
    exptTime: 0,
    isVisible: false,
    taskId: null
}

export default Task;