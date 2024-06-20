import React from "react";

class TimeGap extends React.Component {
    

    render()
    {

        return(
            <div class = "time-gap">
                <p>{this.props.from}  |  {this.props.to}</p>
            </div> 
        )
    }
}

TimeGap.defaultProps = {from: "От", to: "До"}

export default TimeGap;