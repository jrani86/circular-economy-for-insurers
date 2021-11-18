import React from 'react'
import { Component } from 'react';

class Button extends Component{

    state={
        id:this.props.componentProps.id,
        button:this.props.componentProps,
        onClick:this.props.onClick
    }
    
    render(){
        
        return(
            <div>
                <button className={this.state.button.className+" btn"} type="button" onClick={this.state.onClick} id={this.state.id} data-dismiss={this.state.button.data_dismiss}  data-toggle={this.state.button.data_toggle} data-target={this.state.button.data_target}><i className={this.state.button.faClass} aria-hidden="true"></i>&nbsp;{this.state.button.text}</button>
            </div>
        )
    }
}
export default Button;