import React, { Component } from 'react';
import './App.css';
import GetWeather from './getWeather/getWeather';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Your Weather</h1>
        <GetWeather />
      </div>
    );
  }
}

export default App;
