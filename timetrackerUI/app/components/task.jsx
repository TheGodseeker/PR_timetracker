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

    // componentDidUpdate(prevProps) {
    //     // Только сравниваем предыдущие props с текущими, чтобы избежать бесконечного цикла
    //     if (this.props.gapsData !== prevProps.gapsData) {
    //       console.log("Хоба")
    //     }
    //   }

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
        // .then(data => {
        //     return data;
        // })
        .catch(error => this.setState({ error: error}));

        
        // this.setState({gapsData: this.getGaps()})
        // 
        // this.getGaps()

        // // const {gapsData} = this.state

        // // for (let gap in gapsData)
        // //     {
        // //         if (gapsData[gap]['isActive'] === true)
        // //             this.setState({isPlaying: true})
        // //     }
        // console.log("Text")
        // console.log(this.state.gapsData)
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
        // .then(data => {
        //     return data;
        // })
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
            // window.location.reload()
        })

        this.getGaps();
    }

    SetPause = () =>
    {
        // TO-DO: Он не может ни прочиать старые пропсы, ни обновить в них данные.
        // const {gapsData} = this.state
        

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
            // window.location.reload()
        })     


        // this.setState({isPlaying: false})

        // // let curGaps = this.getGaps()

        // console.log(curGaps)

        // for (let gap in curGaps)
        //     {
        //         // console.log(curGaps[gap]['idTask'])
        //         if(curGaps[gap]['idTask'] === this.props.taskId)
        //             {
        //                 // console.log(gapsData[gap]['idTask'])
        //                 if(curGaps[gap]['isActive'])
        //                     {
        //                         // console.log("Есть пробитие")
        //                         var gapId = curGaps[gap]['id']
        //                         // this.SetEndTG(gapsData[gap]['taskId'], gapsData[gap]['isActive'])
        //                         break
        //                     }
        //                 // gapId = curGaps[gap]['id']
        //             }
        //     }

        // this.SetEndTG(gapId, false)
        // console.log(this.state.gapsData)
    }
    render()
    {
        const {isVisible, gapsData, error, isPlaying} = this.state;

        let gapId = null
        // console.log(gapsData)

        for (let gap in gapsData)
            {
                console.log(gapsData)
                if(gapsData[gap]['taskId'] === this.props.taskId)
                    {
                        if(gapsData[gap]['isActive'])
                            {
                                gapId = gap
                                // this.SetEndTG(gapsData[gap]['taskId'], gapsData[gap]['isActive'])
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