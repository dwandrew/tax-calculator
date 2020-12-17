import React from 'react';

const RequiredPay = (props) => {
    console.log(props)
    return (
        <div>
            <h1>Required Pay</h1>
            <input type = "number" onChange={props.requiredChange} value = {props.requiredTakeHome}/>
            <p>Required Yearly: £{props.requiredTakeHomeCalc}</p>
            <p>Required Monthly: £{(props.requiredTakeHomeCalc/12).toFixed(2)}</p>
        </div>

    )

}

export default RequiredPay