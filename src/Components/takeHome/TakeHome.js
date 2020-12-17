import React from 'react';

const TakeHome = (props) => {
    console.log(props)
    return (
        <div>
            <h1>Take home Pay</h1>
            <input type = "number" onChange={props.takeHomeChange} value = {props.takeHome}/>
            <p>Take home Yearly: £{props.takeHomeCalc}</p>
            <p>Take home Monthly: £{(props.takeHomeCalc/12).toFixed(2)}</p>
        </div>

    )

}

export default TakeHome