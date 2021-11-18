import React, { Component } from 'react'


/**
 * Description : Component for displaying label
   Parameters
   ----------
   1. text : Content of the label
   2. id: id of the attribute
   Author : Sreedev Sreedharan 
 */
class Label extends Component {

    state={
        id:this.props.componentProps.id,
        label:this.props.componentProps    
    }

    render() {
        return (
            <div>
                <span id={this.state.id} className={this.state.label.className}>{this.props.componentProps.text}</span>
            </div>
        )
    }
}
export { Label };