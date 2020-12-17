import React from 'react';

const TakeHome = (props) => {
    return (
        <div>
            <h1>Take home Pay</h1>
            <input type = "number" onChange={props.userChange} value = {props.username}/>
        </div>

    )

}

export default TakeHome