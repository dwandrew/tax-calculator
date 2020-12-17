import React from 'react';

const TakeHome = (props) => {
    return (
        <div>
            <h1>Take home Pay after tax</h1>
            <p>Select year for Pay calculation</p>
            <div onChange={props.setYear}>
                <input type="radio" value="19/20" name="takeHomeYear" defaultChecked/> 2019/20
                <br/>
                <input type="radio" value="20/21" name="takeHomeYear"/> 2020/21
            </div>
            <p>Input yearly salary</p>
            <input type = "number" onChange={props.takeHomeChange} value = {props.takeHome} title= "Insert yearly pay"/>
            <p>Take home Yearly: £{props.takeHomeCalc}</p>
            <p>Take home Monthly: £{(props.takeHomeCalc/12).toFixed(2)}</p>
            <button onClick={props.showButton}>See Breakdown of deductions</button>
            { props.show ? <div>
                    <p>Tax: £{props.tax}</p>
                    <p>National insurance: £{props.nat_ins}</p>
                    <p>Personal Allowance Remaining: £{props.allowance}</p>
                </div>: null }
        </div>

    )

}

export default TakeHome