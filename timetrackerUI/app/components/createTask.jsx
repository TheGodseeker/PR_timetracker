import React from "react";



class CreatePage extends React.Component {
    
    
    render()
    { 
        
        return(
            <div class = "tp-main">
                <div class="create-main">
                    <p>Название задачи</p>
                    <input type="text" />
                </div>
                <div class="create-main">
                    <p>Описание</p>
                    <input type="text" />
                </div>
                <div class="create-main">
                    <p>Планируемое кол-во времени</p>
                    <input type="text" />
                </div>
                <p class="add-bt">Создать</p>
            </div>
        )
    }
}

export default CreatePage;