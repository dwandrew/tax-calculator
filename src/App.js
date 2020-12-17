import React, { Component } from 'react';
import './App.css';
import TakeHome from './Components/takeHome/TakeHome'

class App extends Component {
  state = {
    takeHome: 0,
    takeHomeCalc:0,
    requiredTakeHome: 0,
    requiredTakeHomeCalc: 0
  }
  
  
  render() {return (
    <div className="App">
      <TakeHome />
    </div>
  );
  }
}

export default App;
