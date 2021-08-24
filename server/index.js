const express = require('express');
const app = express();
const path = require('path');
const port = 3005;
const axios = require('axios')
const token = require('../config.js')

import { Duffel } from '@duffel/api';
const duffel = new Duffel({
  token: token
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
    passengers: [{ type: "adult" }],
    cabin_class: "economy"
  })
  .then((response) => {
    console.log('Search ID', response.data.id)

    return duffel.offers.list({
      // "after": "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=",
      // "before": "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=",
      "limit": 5,
      "offer_request_id": response.data.id,
      "sort": "total_amount"
      // "max_connections": 2
    })

  })
  .then((response) => {
    console.log('Offer Id', response.data[0].id)
    res.status(200).send(response.data)
  })
  .catch(err => console.error(err))

})





  //query for the single chosen flight
  // duffel.offers.get(response.data[0].id)
  // .then((response) => res.send(response.data))