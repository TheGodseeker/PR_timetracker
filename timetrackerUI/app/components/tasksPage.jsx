import React, { useEffect }  from "react";

import Task  from "./task.jsx";


class TasksPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          data: { key: '', value: '' },
        };
      }

      handleSubmit = async () => {
        try {
          const response = await fetch('http://localhost:5129/api/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.data),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          console.log('Data successfully sent to the server');
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
    // getAllTasks()
    // {
    //     fetch('http://localhost:5129/api/tasks')
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => console.log(data))
    //         .catch(error => console.error('There has been a problem with your fetch operation:', error));
    // }

    
    render()
    {         
        this.handleSubmit()
        console.log(this.state.data)

        return(
            <div class = "tp-main">
                <Task isVisible={true} />
                <Task name="Метаморфозы" spentTime="10 ч. 30 мин." isDoneStyle="acssepted" isDone="Выполнено"/>
                <Task name="Прокростинация рыбы" spentTime="999 ч. 99 мин." timeStyle="overdue"/>
            </div>
        )
    }
}

export default TasksPage;