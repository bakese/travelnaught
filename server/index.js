const express = require('express');
const app = express();
const path = require('path');
const port = 3005;
const Duffel = require('@duffel/api')
const token = require('../config.js')
const axios = require('axios')

app.use(express.static(path.join(__dirname, '..')));

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});


app.get('/flights', (req, res) => {
  var data = JSON.stringify({
    "data": {
      "slices": [
        {
          "origin": "NYC",
          "destination": "ATL",
          "departure_date": "2021-10-21"
        },
        {
          "origin": "ATL",
          "destination": "NYC",
          "departure_date": "2021-10-29"
        }
      ],
      "passengers": [
        {
          "type": "adult"
        }
      ],
      "cabin_class": "economy"
    }
  });

  var config = {
    method: 'post',
    url: 'https://api.duffel.com/air/offer_requests',
    headers: {
      'Accept-Encoding': 'gzip',
      'Accept': 'application/json',
      'Duffel-Version': 'beta',
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    res.send(response.data.data)
  })
  .catch(function (error) {
    // console.log(error);
    res.send(error)
  });
})


app.get('/offers', (req, res) => {
  var config = {
    method: 'get',
    url: 'https://api.duffel.com/air/offers/',
    headers: {
      'Accept-Encoding': 'gzip',
      'Accept': 'application/json',
      'Duffel-Version': 'beta',
      'Authorization': token
    }
  };

  axios(config)
  .then(function (response) {
    // console.log(JSON.stringify(response.data));
    res.send(response.data)

  })
  .catch(function (error) {
    // console.log(error);
    res.send(error)
  });
})