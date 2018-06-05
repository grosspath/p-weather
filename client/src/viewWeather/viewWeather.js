import React from 'react';
import './viewWeather.css';
import ViewForecast from '../viewForecast/viewForecast';
const Skycons = require('react-skycons').default;



class ViewWeather extends React.Component {
  render (){
    let city = this.props.city.replace(/ .*/,'');
    let cityName = city.replace(/,/, "");
    let newcon = this.props.icon.toUpperCase().replace(/-/g, '_');
    let temp = Math.floor(this.props.temp);
    if (this.props.icon !== ''){
      return (
        <div>
          <section className="current_container">
            <h1 className="current_head">Currently</h1>
            <h2 className="city">{cityName}</h2>
            <h2 className="temp">{temp} &#176;F</h2>
            <p className='icon'><Skycons color='white' icon={newcon} /></p>
            <p className="condition">{this.props.condition}</p>
          </section>
          <h1 className="week_head">This Week</h1>
          <ViewForecast forecastData={this.props.forecastData} />
        </div>
      )
    }
    else {
     return null
    }
  };
}

export default ViewWeather;
