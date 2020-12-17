import React from 'react';
import '../../Components/taxForm.css';

const TakeHome = (props) => {
    return (
        <div className = "take-home-form">
            <h1>Take home Pay after tax</h1>

            <h3>Select year for Pay calculation</h3>
            <div onChange={props.setYear} className ="extra-info">
                <input type="radio" value="19/20" name="takeHomeYear" defaultChecked/> 2019/20
                <br/>
                <input type="radio" value="20/21" name="takeHomeYear"/> 2020/21
            </div>

            <h3>Input yearly salary</h3>
            <input type = "number" onChange={props.takeHomeChange} value = {props.takeHome} title= "Insert yearly pay"/>
            <div className ="extra-info">
                <p>Take home Yearly: £{props.takeHomeCalc}</p>
                <p>Take home Monthly: £{(props.takeHomeCalc/12).toFixed(2)}</p>
            </div>

            <button onClick={props.showButton}>See Breakdown of Deductions</button>
            { props.show ? 
                <div className ="extra-info">
                    <p>Tax: £{props.tax}</p>
                    <p>National insurance: £{props.nat_ins}</p>
                    <p>Personal Allowance Remaining: £{props.allowance}</p>
                </div>: null }
        </div>

    )

}

export default TakeHome