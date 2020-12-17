import React, { Component } from 'react';
import './App.css';
import TakeHome from './Components/takeHome/TakeHome'
import RequiredPay from './Components/requiredPay/RequiredPay'

class App extends Component {
  state = {
    takeHome: 0,
    takeHomeCalc:0,
    requiredTakeHome: 0,
    requiredTakeHomeCalc: 0,
    rates: {"basic_rate": 0.2, "higher_rate": 0.4, "additional_rate": 0.45 },
    thresholds:{"lowest": 12500, "basic": 50000, "higher": 150000},
    ni: {
      "19/20": {"lower_limit": 719, "upper_limit": 4167},
      "20/21": {"lower_limit": 792, "upper_limit": 4167}
    }

  }

  // National insurance calculator
  nat_insurance = (n, limits_hash) => {
    n = n/12
    let final
    if (n <= limits_hash["lower_limit"]) {
        final = n * 12
    }
    else if (n > limits_hash["lower_limit"]  && n <= limits_hash["upper_limit"]){
        let twelve_percent = n - limits_hash["lower_limit"]
        let total = twelve_percent * 0.88
        total += limits_hash["lower_limit"]
        final = total * 12
    }
    else {
        let twelve_percent = (limits_hash["upper_limit"] - limits_hash["lower_limit"])
        twelve_percent = twelve_percent * 0.88
        n = n - limits_hash["upper_limit"]
        let total = n * 0.98
        total += twelve_percent
        total += limits_hash["lower_limit"]
        final = total * 12
    }
    return final
  }
// Calculating personal_allowance

personal_allowance = (n, allowance) => {
    if (n > 100000){
        let over = n - 100000
        let reduction = Math.floor(over/2)
        allowance -= reduction
        return allowance <= 0 ? 0 : allowance
    }
    else {
        return allowance}
}


// final tax calculator

tax = (n, rates, thresholds, nat_insurance_hash) => {
let final
let nat_ins_deductions = n - this.nat_insurance(n, nat_insurance_hash)
let allowance = this.personal_allowance(n, 12500)

if (n<= thresholds["lowest"]) {
    let total = n - nat_ins_deductions
    final = total 
}
else if (n <= thresholds["basic"]){
    let taxable = n - allowance
    let total = taxable - (taxable * rates["basic_rate"])
    total -= nat_ins_deductions
    total += allowance
    final = total
}
else if (n <= thresholds["higher"]) {
    let taxable = n - allowance
    let basic = thresholds["basic"] - 12500
    let higher = taxable - basic
    basic -= basic * rates["basic_rate"]
    higher -= higher * rates["higher_rate"]
    let total = basic + higher + allowance
    total -= nat_ins_deductions
    final = total
}
else {
    let basic = thresholds["basic"] - 12500
    let higher = thresholds["higher"] - basic
    let additional = n - thresholds["higher"]
    basic -= basic * rates["basic_rate"]
    higher -= higher * rates["higher_rate"]
    additional -= additional * rates["additional_rate"]
    let total = basic + higher + additional + allowance
    total -= nat_ins_deductions
    final = total
}
return final.toFixed(2)
}

// Take home pay calculator montly take home

take_home_pay_monthly = (n, rates, thresholds, nat_insurance_hash) => {
    let yearly = n * 12
    let taxed = this.tax(yearly, rates, thresholds, nat_insurance_hash)
    let monthly = taxed/12
    for(yearly; monthly < n; yearly+=100){
        taxed = this.tax(yearly, rates, thresholds, nat_insurance_hash)
        monthly = taxed/12
    }
    return yearly
}

// Take home pay calculator yearly take home


take_home_pay_yearly = (n, rates, thresholds, nat_insurance_hash) => {
    let taxed = this.tax(n, rates, thresholds, nat_insurance_hash)
    let target = n
    for(n;  taxed < target; n+=500){
        taxed = this.tax(n, rates, thresholds, nat_insurance_hash)
    }
    return n
}

  takeHomeChange = (event) => {
    let num = event.target.value
    let taxed = this.tax(num, this.state.rates, this.state.thresholds, this.state.ni["19/20"])
    console.log(taxed)
    this.setState({
      takeHome: num,
      takeHomeCalc: taxed
    })
    console.log(this.state)
  }




  
  render() {return (
    <div className="App">
      <TakeHome takeHome = {this.state.takeHome} takeHomeCalc={this.state.takeHomeCalc} takeHomeChange={this.takeHomeChange}/>
      <RequiredPay requiredTakeHome = {this.state.requiredTakeHome} requiredTakeHomeCalc = {this.state.requiredTakeHomeCalc} requiredChange = {this.requiredChange}/>
    </div>
  );
  }
}

export default App;
