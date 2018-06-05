const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('isomorphic-fetch');
require('es6-promise').polyfill();

const app = express();

const apiKey = 'b0fccff580ccb6afd8524b41bc94adb4';
const darkSky_URL = 'https://api.darksky.net/forecast/';

app.use(bodyParser.json());

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/', (req, res) => {
  res.send('server up and running');
});

app.get('/api/darksky', (req, res) => {
  try {

    //retrieving location coordinates from citySearch
    let lat = req.query.latitude;
    let lng = req.query.longitude;
    console.log(lat, lng);

    fetch(`${darkSky_URL}${apiKey}/${lat},${lng}`)
    .then(response => {
      if (response.status != 200) {
        res.status(response.status).json({'message': 'Bad response from API'});
      }
      return response.json();
    })
    .then(payload => {
      res.status(200).json(payload);
    });
  } catch(err) {
    console.log('Error requesting API', err);
    res.status(500).json({'message': 'Error requesting API'});
  }
  });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Weather app is listening on ${port}`);
