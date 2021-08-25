const express = require('express');
const app = express();
const path = require('path');
const port = 3005;
const axios = require('axios')
const token = require('../config.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

import { Duffel } from '@duffel/api';
const duffel = new Duffel({
  token: token
})

app.use(express.static(path.join(__dirname, '..')));
app.use(express.json());

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
        departure_date: "2021-11-21"
      },
      {
        origin: "ATL",
        destination: "NYC",
        departure_date: "2021-11-27"
      }
    ],
    passengers: [{ type: "adult" }],
    cabin_class: "economy"
  })
  .then((response) => {
    // console.log('Search ID', response.data.id)

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
    // console.log('Offer Id', response.data[0].id)
    res.status(200).send(response.data)
  })
  .catch(err => console.error(err))

})

app.get('/create_order', (req, res) => {

  console.log('attempting to book')

  duffel.orders.create({
    selected_offers: [req.query.id],
    payments: [
      {
        type: "balance",
        currency: req.query.total_currency,
        amount: req.query.total_amount
      }
    ],
    passengers: [
      {
        phone_number: "+442080160523",
        email: "tony@example.com",
        born_on: "1980-07-24",
        title: "mr",
        gender: "m",
        family_name: "Stark",
        given_name: "Tony",
        id: JSON.parse(req.query.passengers[0]).id
      }
    ]
  })
  .then((response) => {
    console.log('BOOKING SERVER REAPONSE:::', response)
    res.status(200).send(response)
  })
  .catch((err) => console.error(err))


})




  //query for the single chosen flight
  // duffel.offers.get(response.data[0].id)
  // .then((response) => res.send(response.data))