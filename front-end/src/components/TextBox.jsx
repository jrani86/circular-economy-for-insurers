import React, { Component } from 'react'


 /**
    *   Description : Component for displaying textbox
        Parameters
        ----------
        1. placeholder : placeholder of the text
        2. id: id of the attribute
        3. class: extra class names
        Author : Sreedev Sreedharan 
 */
class TextBox extends Component {

    state={
        id: this.props.componentProps.id,
        textbox: this.props.componentProps,
        onChange: this.props.onChange,
        onClick:this.props.onClick
    }

    

    render() {  
        let valueProps ="";
        if(this.props.componentProps.value!==undefined && this.props.componentProps.value!==""){   
             valueProps ={
                value:this.props.componentProps.value 
            }        
          
        } 
        return (
            <div>
                <input onChange={this.state.onChange} name={this.props.componentProps.name} {...valueProps}  defaultValue={this.props.componentProps.defaultValue} checked={this.props.componentProps.checked}onClick={this.state.onClick} data-toggle={this.state.textbox.dataToggle} required={this.props.componentProps.required} className={this.state.textbox.className} placeholder={this.state.textbox.placeholder} id={this.state.id} type={this.state.textbox.type}></input>
            </div>
        )
    }
}
export { TextBox };