import React, { Component } from 'react'
import { Label } from './Label';
import { DatePicker } from './DatePicker';


class PolicyDate extends Component {

    state={
        screenState:this.props.screenState
    }

    render() {
        console.log(this.props.newPeriodDate)
        return (
          
                    
                    <div className="col-md-5">
                        <form id="policystartform">
                        <fieldset 
                            disabled={this.props.disableInPolicyChange}>
                        <div className="row">
                            <div className="col-md-6">
                                <Label
                                    componentProps={{
                                        id:  "policystartDate",
                                        text: "Policy Start Date",
                                        className: "small required-field font-metroplis",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row pt-1">
                            <div className="col-md-12">
                                <DatePicker
                            
                                    componentProps={{
                                        id: "firstpolicystartdate",
                                        className:"dob form-control",
                                customDate: this.props.newPeriodDate !== undefined && this.props.newPeriodDate[0] !== undefined ? this.props.newPeriodDate[0] :
                                        this.props.submission[0]==undefined ?
                                        new Date(): this.props.submission[0].periodStartDate
                                        
                                    }}
                                />
                            </div>
                        </div>
                        </fieldset></form>

                    </div>
                

        )
    }

}

export default PolicyDate;