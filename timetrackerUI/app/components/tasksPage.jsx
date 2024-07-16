import React, { useEffect }  from "react";

import Task  from "./task.jsx";


class TasksPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.Ref = React.createRef();

        this.state = {
          data: null,
          gapsData: null,
          error: null,
        };
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

                tasksList.push(<Task 
                  name={data[task]['name']} 
                  desc={data[task]['desc'] ?? "Описание отсутствует."} 
                  isDoneStyle={data[task]['isDone'] ?  "acssepted": "acssept"}
                  isDone={data[task]['isDone'] ?  "Выполнено": "Закончить"}
                  exptTime={data[task]['expTime'] }
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