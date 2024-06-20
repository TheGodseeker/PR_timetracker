import React from "react";

import GapsCard from "./gapsCard.jsx";

class Overlay extends React.Component {
    

    render()
    {
        if (!this.props.isVisible)
            return null;
        
        return(
            <div class = "overlay">
                <div class = "overview">
                    <h4>Описание</h4>
                    <p>{this.props.desc}</p>
                </div>
                <div class = "expt-time">
                    <p>Предполагаемое время</p>
                    <p>{this.props.exptTime}</p>
                </div>
            </div> 
        )
    }
}

Overlay.defaultProps = {
    isVisible: false,
    desc: "Nullam vel massa sed lacus fringilla laoreet sed at mauris. Nunc at dapibus eros. Aliquam pharetra ligula nec fringilla tincidunt. Nulla vestibulum orci id tristique commodo. Duis tristique pulvinar ante, id maximus eros. Sed posuere vitae eros non hendrerit. Nulla euismod mauris eu sapien bibendum, nec luctus velit aliquet. Curabitur id lectus suscipit, feugiat neque in, pharetra ligula. Donec rutrum turpis mi, eget malesuada eros gravida vitae. Phasellus blandit pretium leo sed suscipit. Sed commodo cursus suscipit. Integer vitae tellus sem. Donec nibh arcu, pretium a convallis non, venenatis posuere nibh. Donec sagittis ultricies erat, ac ultrices purus. In hac habitasse platea dictumst.",
    exptTime: "0 ч. 0 мин."
}

export default Overlay;