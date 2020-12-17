import React from 'react';
import '../../Components/taxForm.css';

const RequiredPay = (props) => {
    return (
        <div className = "required-form">
        <h1>Required Pay per Month after tax</h1>
          <h3>Select year for Pay calculation</h3>

            <div onChange={props.setYear} className ="extra-info">
                <input type="radio" value="19/20" name="requiredYear"  defaultChecked/> 2019/20
                <br/>
                <input type="radio" value="20/21" name="requiredYear"/> 2020/21
            </div>

            <h3>Input required monthly salary (after tax)</h3>
            <input type = "number" onChange={props.requiredChange} value = {props.requiredTakeHome} title= "Insert required monthly pay"/>
            
            <div className ="extra-info">
                <p>Required Yearly Salary: £{props.requiredTakeHomeCalc}</p>
                <p>Required Monthly Salary: £{(props.requiredTakeHomeCalc/12).toFixed(2)}</p>
            </div>

            <button onClick={props.showButton}>See Breakdown of Deductions</button>
            { props.show ? <div className ="extra-info">
                    <p>Tax: £{props.tax}</p>
                    <p>National insurance: £{props.nat_ins}</p>
                    <p>Personal Allowance Remaining: £{props.allowance}</p>
                </div>: null }
        </div>

    )

}

export default RequiredPay