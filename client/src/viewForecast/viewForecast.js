import React from 'react';
import './viewForecast.css';
const Skycons = require('react-skycons').default;

class ViewForecast extends React.Component {
  render() {
    return <div className="container">
      {this.props.forecastData.map(data =>
        <span className="cell" key={Math.random()}>
          <p className="day">{data.day}</p>
          <p><Skycons color='white' icon={data.icon.toUpperCase().replace(/-/g, '_')} /></p>
          <p className="high_temp">{data.high} &#176;F</p>
          <p className="low_temp">{data.low} &#176;F</p>
          <p className="summary">{data.summary}</p>
        </span>
      )}
    </div>
  }
}



export default ViewForecast;
