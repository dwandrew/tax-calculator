import React, { Component } from 'react';
import './App.css';
import TakeHome from './Components/takeHome/TakeHome'
import RequiredPay from './Components/requiredPay/RequiredPay'
import Footer from './Components/Footer/Footer'

class App extends Component {
  state = {
    showTakeHomebreakdown: false,
    takeHome: 0,
    takeHomeCalc:0,
    takeHomeTax:0,
    takeHomeNatIns:0,
    takeHomeAllowance:0,
    takeHomeYear: '19/20',
    showRequiredYearBreakdown: false,
    requiredYear:'19/20',
    requiredTakeHome: 0,
    requiredTakeHomeCalc: 0,
    requiredTakeHomeTax:0,
    requiredTakeHomeNatIns:0,
    requiredTakeHomeAllowance:0,
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
  let tax = 0

  if (n<= thresholds["lowest"]) {
      let total = n - nat_ins_deductions
      final = total 
  }
  else if (n <= thresholds["basic"]){
      let taxable = n - allowance
      let total = taxable - (taxable * rates["basic_rate"])
      tax = taxable - total
      total += allowance
      total -= nat_ins_deductions
      final = total
  }
  else if (n <= thresholds["higher"]) {
      let taxable = n - allowance
      let basic = thresholds["basic"] - 12500
      let higher = taxable - basic
      basic -= basic * rates["basic_rate"]
      higher -= higher * rates["higher_rate"]
      let total = basic + higher + allowance
      tax = taxable - (basic + higher)
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
      tax = n - total
      total -= nat_ins_deductions
      final = total
  }
let final_hash = {
    "final": final.toFixed(2), 
    "nat_ins": nat_ins_deductions.toFixed(2), 
    "allowance": allowance, 
    "tax": tax.toFixed(2)
  }
return final_hash
}

// Take home pay calculator montly take home

take_home_pay_monthly = (n, rates, thresholds, nat_insurance_hash) => {
    let yearly = n * 12
    let taxed = this.tax(yearly, rates, thresholds, nat_insurance_hash)
    let monthly = taxed["final"]/12
    for(yearly; monthly < n; yearly+=100){
        taxed = this.tax(yearly, rates, thresholds, nat_insurance_hash)
        monthly = taxed["final"]/12
    }

    taxed = this.tax(yearly, rates, thresholds, nat_insurance_hash)
    let required_hash = {
      "yearly": yearly, 
      "nat_ins": taxed["nat_ins"], 
      tax: taxed["tax"], 
      takeHomeYearly: taxed["final"], 
      allowance: taxed["allowance"]
    }
    return required_hash
}
// For setting year and recaculating if year gets changed 

  takeHomeYear = (event) => {
    let taxed = this.tax(this.state.takeHome, this.state.rates, this.state.thresholds, this.state.ni[event.target.value])
    this.setState({
      takeHomeYear: event.target.value,
      takeHomeCalc: taxed["final"],
      takeHomeNatIns: taxed["nat_ins"],
      takeHomeTax: taxed["tax"],
      takeHomeAllowance: taxed["allowance"]
    })

  }
  // For getting yearly wage information and processing it for take home wage 

  takeHomeChange = (event) => {
    let num = event.target.value
    let taxed = this.tax(num, this.state.rates, this.state.thresholds, this.state.ni[this.state.takeHomeYear])
    this.setState({
      takeHome: num,
      takeHomeCalc: taxed["final"],
      takeHomeNatIns: taxed["nat_ins"],
      takeHomeTax: taxed["tax"],
      takeHomeAllowance: taxed["allowance"]
    })
  }

// for presenting or hiding take home breakdown information

  takeHomeShow = () => {
    this.setState({
      showTakeHomebreakdown: !this.state.showTakeHomebreakdown
    })
  }

  // For setting year and recaculating if year gets changed 

  requiredYear = (event) => {
    let sum = this.take_home_pay_monthly(this.state.requiredTakeHome, this.state.rates, this.state.thresholds, this.state.ni[event.target.value])
    this.setState({
      requiredYear: event.target.value,
      requiredTakeHomeCalc: sum["yearly"],
      requiredTakeHomeTax:sum["tax"],
      requiredTakeHomeNatIns: sum["nat_ins"],
      requiredTakeHomeAllowance: sum["allowance"]
    })

  }

  // for working out what wage needs to be paid for a monthly take home

  requiredChange = (event) => {
    let num = event.target.value
    let sum  = this.take_home_pay_monthly(num, this.state.rates, this.state.thresholds, this.state.ni[this.state.requiredYear])
    this.setState({
      requiredTakeHome: num,
      requiredTakeHomeCalc: sum["yearly"],
      requiredTakeHomeTax:sum["tax"],
      requiredTakeHomeNatIns: sum["nat_ins"],
      requiredTakeHomeAllowance: sum["allowance"]
    })
  }


// for presenting or hiding required monthly information
  requiredShow = () => {
    this.setState({
      showRequiredYearBreakdown: !this.state.showRequiredYearBreakdown
    })
  }



  
  render() {return (
    <div className="App">
      <TakeHome 
        setYear = {this.takeHomeYear} 
        year = {this.state.takeHomeYear} 
        takeHome = {this.state.takeHome} 
        takeHomeCalc={this.state.takeHomeCalc} 
        takeHomeChange={this.takeHomeChange}
        nat_ins = {this.state.takeHomeNatIns}
        allowance = {this.state.takeHomeAllowance}
        tax = {this.state.takeHomeTax}
        showButton = {this.takeHomeShow}
        show = {this.state.showTakeHomebreakdown}  
      />
      <RequiredPay 
        setYear = {this.requiredYear} 
        year = {this.state.requiredYear} 
        requiredTakeHome = {this.state.requiredTakeHome} 
        requiredTakeHomeCalc = {this.state.requiredTakeHomeCalc} 
        requiredChange = {this.requiredChange}
        nat_ins = {this.state.requiredTakeHomeNatIns}
        allowance = {this.state.requiredTakeHomeAllowance}
        tax = {this.state.requiredTakeHomeTax}
        showButton = {this.requiredShow}
        show = {this.state.showRequiredYearBreakdown}  
      />
      <Footer/>
    </div>
  );
  }
}

export default App;
