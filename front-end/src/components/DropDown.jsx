import React, { Component } from 'react'

/**
    *   Description : Component for displaying textbox
        Parameters
        ----------                        
        1. id: id of the attribute
        2. onChange : action to be performed when value changes
        3. options : key value pair to set the drop down values and dispaly names
        Author : Sreedev Sreedharan 
*/
class DropDown extends Component {

    state={
        id:this.props.componentProps.id,
        dropdown:this.props.componentProps,
        onChange:this.props.onChange,
        onClick:this.props.onClick
    }

    

    render() { 
        // console.log(this.props.componentProps.defaultValue)
        return (
            <div>
                
                <select  onClick={this.props.onClick} onChange={this.props.onChange} className={this.props.componentProps.className} required={this.props.componentProps.required} name={this.props.componentProps.name} id={this.props.componentProps.id}>
                    {this.props.componentProps.options.map(option => (
                        this.props.componentProps.defaultValue!==undefined && this.props.componentProps.defaultValue.key===option.key?
                        <option selected  key={option.key} value={option.key}>{option.value}</option>:
                        <option   key={option.key} value={option.key}>{option.value}</option>

                    ))}
                </select>
            </div>
        )
    }
} export {DropDown};