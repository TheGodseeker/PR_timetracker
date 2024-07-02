import React from "react";

import TimeGap from "./timeGap.jsx";

class GapsCard extends React.Component {
    
    constructor(props) {
        super(props);



        this.state = {
          data: null,
          error: null,
        };
      }

    componentDidMount()
    {
        this.interval = setInterval(() => this.getGaps(), 1000) 
    }

    getGaps()
    {
        fetch(`http://localhost:5129/Gaps/GetTimeGaps?taskID=${this.props.taskID}`)
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
        if (!this.props.isVisible)
            return null;
        
        const {data, error} = this.state;
        const gapsList = []

        for (let gap in data)
            {
                gapsList.push(<TimeGap 
                    from={data[gap]['timeStart']}
                    to={data[gap]['timeFinish'] ?? "- - -"}
                />)
            }

        return(
            <div class = "gaps-card">
                <h3>Промежутки работы</h3>
                <h5>От | До</h5>
                {gapsList.length === 0 ? <div class = "time-gap"><p>Промежутков нет.</p></div> : gapsList}
                
            </div> 
        )
    }
}

GapsCard.defaultProps = {
    isVisible: false,
    taskID : null
}

export default GapsCard;