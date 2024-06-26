import React, { useEffect }  from "react";

import Task  from "./task.jsx";


class TasksPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data: null,
          gapsData: null,
          error: null,
        };
      }

    getGaps(taskId)
    {

        fetch(`http://localhost:5129/Gaps/GetTimeGaps?taskID=${taskId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => this.setState({ gapsData: data}))
        .catch(error => this.setState({ error: error}));

    }

      componentDidMount() {

        let getFunc = 'GetAllTasks'

        if(this.props.isDone != null)
          {
            if (this.props.isDone)
              getFunc = 'GetDoneTasks'
            else
              getFunc = 'GetUndoneTasks'
          }

        fetch(`http://localhost:5129/Tasks/${getFunc}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => this.setState({ data: data}))
          .catch(error => this.setState({ error: error}));
    }
    
    render()
    {         
        const {data, gapsData, error} = this.state;
        const tasksList = []

        if (error)
          {
            console.error(error.message)
          }
        else
          {

            for (let task in data) {
                var spentHours = Math.floor(data[task]['spentTime']/3600000);
                var spentMinutes = Math.floor((data[task]['spentTime'] - spentHours * 3600000)/60000);
                var spentSeconds = Math.floor(((data[task]['spentTime'] - spentHours * 3600000) - spentMinutes * 60000)/1000)

                let expHours = null
                let expMinutes = null
                let expSeconds = null

                var expTimeTxt = "Не установлено"
                var timeStyleName = "norm-time"
                
                if (data[task]['expTime'] != 0)
                  {
                    expHours = Math.floor(data[task]['expTime']/3600000)
                    expMinutes = Math.floor((data[task]['expTime'] - expHours * 3600000 )/60000)
                    expSeconds = Math.floor(((data[task]['expTime'] - expHours * 3600000) - expMinutes * 60000)/1000)

                    expTimeTxt = `${expHours} ч. ${expMinutes} мин. ${expSeconds} сек.`

                    if (data[task]['spentTime'] > data[task]['expTime'])
                        timeStyleName = "overdue"
                  } 
                

                tasksList.push(<Task 
                  name={data[task]['name']} 
                  desc={data[task]['desc'] ?? "Описание отсутствует."} 
                  isDoneStyle={data[task]['isDone'] ?  "acssepted": "acssept"}
                  isDone={data[task]['isDone'] ?  "Выполнено": "Закончить"}
                  spentTime={`${spentHours} ч. ${spentMinutes} мин. ${spentSeconds} сек.`}
                  exptTime={expTimeTxt}
                  timeStyle={timeStyleName}
                  taskId={data[task]['id']}
                  />)
              
                }
          }
        
        return <div class = "tp-main">{tasksList}</div>;
    }
}

TasksPage.defaultProps = {
  isDone: null,
}

export default TasksPage;