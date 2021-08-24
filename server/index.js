const express = require('express');
const app = express();
const path = require('path');
const port = 3005;
// const duffel = require('@duffel/api')
// const token = require('../config.js')
const axios = require('axios')

import { Duffel } from '@duffel/api';

const duffel = new Duffel({
  token: 'duffel_test_KLnfbxBljmSAZ_ZbXBcz1nedpgyp1qWuYEBfv-Fm1Jt'
})

app.use(express.static(path.join(__dirname, '..')));

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});


app.get('/offer_request', (req, res) => {

  duffel.offerRequests.create({
    return_offers: false,
    slices : [
      {
        origin: "NYC",
        destination: "ATL",
        departure_date: "2021-10-21"
      },
      {
        origin: "ATL",
        destination: "NYC",
        departure_date: "2021-10-27"
      }
    ],
    passengers: [{ type: "adult" }, { type: "adult" }, { age: 29 }],
    cabin_class: "economy"
  })
  // .then((response) => console.log(response))
  .then((response) => res.send(response))


  // var data = JSON.stringify({
  //   "data": {
  //     "return_offers": false,
  //     "slices": [
  //       {
  //         "origin": "NYC",
  //         "destination": "ATL",
  //         "departure_date": "2021-10-21"
  //       },
  //       {
  //         "origin": "ATL",
  //         "destination": "NYC",
  //         "departure_date": "2021-10-29"
  //       }
  //     ],
  //     "passengers": [
  //       {
  //         "type": "adult"
  //       }
  //     ],
  //     "cabin_class": "economy"
  //   }
  // });

  // var config = {
  //   method: 'post',
  //   url: 'https://api.duffel.com/air/offer_requests',
  //   headers: {
  //     'Accept-Encoding': 'gzip',
  //     'Accept': 'application/json',
  //     'Duffel-Version': 'beta',
  //     'Authorization': token,
  //     'Content-Type': 'application/json'
  //   },
  //   data : data
  // };

  // axios(config)
  // .then(function (response) {
  //   // console.log(JSON.stringify(response.data));
  //   res.send(response.data.data)
  // })
  // .catch(function (error) {
  //   // console.log(error);
  //   res.send(error)
  // });
})


app.get('/offers', (req, res) => {
  var config = {
    method: 'get',
    url: 'https://api.duffel.com/air/offers/?offer_request_id=orq_0000AAemHnBwQRL8rF5Iw4&limit=10&sort=total_amount',
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