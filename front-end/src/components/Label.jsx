import React, { Component } from 'react'

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