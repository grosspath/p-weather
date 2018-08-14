import React from 'react';
import './getWeather.css';
import callApi from '../utils';
import ViewWeather from '../viewWeather/viewWeather';
const googleAPIKey = 'AIzaSyBQ42qfiEmdfkckWEAGqaSzECOW10ngF2w';
const dateFormat = require('dateformat');

class GetWeather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      condition: '',
      lat: '',
      lng: '',
      temp: '',
      hour: '',
      time: '',
      icon: '',
      data: [],
      location: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getForecast = this.getForecast.bind(this);
  }

  getForecast(city) {
      return (
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${googleAPIKey}`
        ).then(data => {
          return data.json();
        }).then(response => {
          this.setState({
            city: response.results[0].formatted_address
          })
          return response.results[0].geometry.location
        }).then(coords => {
          this.setState({
            lat: coords.lat,
            lng: coords.lng
          });

          const url = `/api/darksky?latitude=${this.state.lat}&longitude=${this.state.lng}`;
          callApi(url, this.darkSkySuccess);
        })
      )
  }

  darkSkySuccess = (payload) => {
    console.log(payload);
    let dataObj = {};
    let dataArray = [];
    const temp = payload.currently.temperature;
    let time = dateFormat(payload.currently.time*1000, "h: M TT").toString();
    const icon = payload.currently.icon;
    let condition = payload.currently.summary;

    payload.daily.data.map(item => {
      console.log('item',item);
      dataObj = {
        day: dateFormat(item.time*1000, "ddd").toString(),
        icon: item.icon,
        high: Math.floor(item.temperatureHigh),
        low: Math.floor(item.temperatureLow),
        summary: item.summary

      }
      dataArray.push(dataObj)
      return dataArray;
    })
    this.setState({
      condition,
      temp,
      time,
      icon,
      data: dataArray
    })
  }

  handleChange(evt) {
    this.setState({
      location: evt.target.value
    });
  }

  handleSearch(evt) {
    evt.preventDefault();
    if (this.state.location === '') {
      alert('Please enter a city')
    } else {
    this.getForecast(this.state.location);
    }
  }

  render(){
    return (
      <div>
        <form>
          <input className="input_field" onChange={this.handleChange} type="text" id="city-search" placeholder="e.g. Charleston, SC"></input>
          <button onClick={this.handleSearch} className="btn">Get Weather</button>
        </form>
        <ViewWeather
          temp={this.state.temp}
          time={this.state.time}
          icon={this.state.icon}
          city={this.state.city}
          forecastData={this.state.data}
          location={this.state.location}
          condition={this.state.condition}
       />
      </div>
    )
  }
}

export default GetWeather;
