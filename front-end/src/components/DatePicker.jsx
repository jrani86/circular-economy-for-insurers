import React from 'react'
import { Component } from 'react';
import DatePick from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class DatePicker extends Component {

    state = {
        startDate: "",
        id: this.props.componentProps.id,
        date: this.props.componentProps,
        onChange: this.props.onChange
    };


    /**Using custom date from Component props for fetching the date
     */
    componentWillMount = () => {

        if (this.props.componentProps.customDate !== undefined && this.props.componentProps.customDate !== "") {
            let setdate = new Date(this.props.componentProps.customDate)
            this.setState({
                startDate: new Date(setdate.getFullYear(), setdate.getMonth(), setdate.getDate())
            })
        }
    }

    handleChange = (date) => {

        this.setState({
            startDate: date,
        });
        if (this.state.action !== undefined) {
            this.state.onChange(date);
        }

    }
    render() {

        return (
            <div>
                <DatePick id={this.state.id}
                    showYearDropdown
                    showMonthDropdown
                    // selected={this.props.componentProps.customDate===undefined || this.props.componentProps.customDate===""?this.state.startDate
                    // :(new Date( new Date(this.props.componentProps.customDate).getFullYear(),new Date(this.props.componentProps.customDate).getMonth(), new Date(this.props.componentProps.customDate).getDate()))}
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    required = {this.props.required === undefined ? true : this.props.required}
                    name = {this.props.name === undefined ? "date" : this.props.name}
                    className={this.props.componentProps.className} />
            </div>
        )
    }
}
export { DatePicker }