import React, { Component } from 'react'

class DropDown extends Component {

    state={
        id:this.props.componentProps.id,
        dropdown:this.props.componentProps,
        onChange:this.props.onChange,
        onClick:this.props.onClick
    }

    

    render() { 
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