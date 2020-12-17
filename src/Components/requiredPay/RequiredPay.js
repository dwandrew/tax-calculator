import React from 'react';

const RequiredPay = (props) => {
    return (
        <div>
        <h1>Required Pay per Month after tax</h1>
          <p>Select year for Pay calculation</p>
            <div onChange={props.setYear}>
                <input type="radio" value="19/20" name="requiredYear"  defaultChecked/> 2019/20
                <br/>
                <input type="radio" value="20/21" name="requiredYear"/> 2020/21
            </div>

            <p>Input required monthly salary (after tax)</p>
            <input type = "number" onChange={props.requiredChange} value = {props.requiredTakeHome} title= "Insert required monthly pay"/>
            <p>Required Yearly Salary: £{props.requiredTakeHomeCalc}</p>
            <p>Required Monthly Salary: £{(props.requiredTakeHomeCalc/12).toFixed(2)}</p>
            <button onClick={props.showButton}>See Breakdown of deductions</button>
            { props.show ? <div>
                    <p>Tax: £{props.tax}</p>
                    <p>National insurance: £{props.nat_ins}</p>
                    <p>Personal Allowance Remaining: £{props.allowance}</p>
                </div>: null }
        </div>

    )

}

export default RequiredPay