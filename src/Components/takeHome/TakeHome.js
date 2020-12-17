import React from 'react';

const TakeHome = (props) => {
    return (
        <div>
            <h1>Take home Pay</h1>
            <input type = "number" onChange={props.takeHomeChange} value = {props.takeHome}/>
            <p>{props.takeHomecalc}</p>
        </div>

    )

}

export default TakeHome