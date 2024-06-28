import React from "react";

import {Link}  from "react-router-dom";

class CreatePage extends React.Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          desc: '',
          time: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSend.bind(this);
      }
    

    handleChange(event) {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    async handleSend(event) {

        console.log('Submitted values:', this.state);
        fetch(`http://localhost:5129/Tasks/AddTask?_name=${this.state.name}&_desc=${this.state.desc}&exptTime=${this.state.time}`, {
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
            window.location.reload()
        })
    }


    
    render()
    { 
        
        return(
            <div class = "tp-main">
                <div class="create-main">
                    <p>Название задачи</p>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                </div>
                <div class="create-main">
                    <p>Описание</p>
                    <input type="text" name="desc" value={this.state.desc} onChange={this.handleChange}/>
                </div>
                <div class="create-main">
                    <p>Планируемое кол-во времени</p>
                    <input type="number" name="time" value={this.state.time} onChange={this.handleChange}/>
                </div>
                <Link className={"add-bt"} to="/" onClick={(event) => this.handleSend(event)}>Создать</Link>
            </div>
        )
    }
}

export default CreatePage;