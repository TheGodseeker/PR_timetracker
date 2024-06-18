import React from "react";

import Task  from "./task.jsx";


class TasksPage extends React.Component {
    
    
    render()
    { 
        
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