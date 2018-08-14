import React from 'react';
import './viewForecast.css';
const Skycons = require('react-skycons').default;

class ViewForecast extends React.Component {
  render() {
    return (
        <div className="container-fluid forecastSection">

        {this.props.forecastData.map(data =>
          <div className="forecastBody"  key={Math.random()}>
          <div className="cell">
            <p className="day">{data.day}</p>
            <p className="sky-con container">
              <Skycons color='#F6EFD2' icon={data.icon.toUpperCase().replace(/-/g, '_')} />
            </p>
          </div>
            <div className="bottom-cell">
              <p className="high_temp">{data.high} &#176;F</p>
              <p className="low_temp">{data.low} &#176;F</p>
              <p className="summary">{data.summary}</p>
            </div>
          </div>
        )}

      </div>
    )
  }
}



export default ViewForecast;
