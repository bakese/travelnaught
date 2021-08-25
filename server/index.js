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

  // console.log('OFFER REQUEST:::', req.query)

  duffel.offerRequests.create({
    return_offers: false,
    slices : [
      {
        origin: req.query.origin,
        destination: req.query.destination,
        departure_date: req.query.departDate
      },
      {
        origin: req.query.destination,
        destination: req.query.origin,
        departure_date: req.query.returnDate
      }
    ],
    passengers: [{ type: "adult" }],
    cabin_class: "economy"
  })
  .then((response) => {

    return duffel.offers.list({
      // "after": "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=",
      // "before": "g2wAAAACbQAAABBBZXJvbWlzdC1LaGFya2l2bQAAAB=",
      "limit": 15,
      "offer_request_id": response.data.id,
      "sort": "total_amount"
      // "max_connections": 2
    })

  })
  .then((response) => {
    // console.log('Offer Id', response.data[0].id)
    // console.log('SENDING SEARCH RESULTS')
    res.status(200).send(response.data)
  })
  .catch(err => console.error(err))

})

app.get('/create_order', (req, res) => {

  var flightInfo = JSON.parse(req.query.flightInfo);
  var passengerInfo = JSON.parse(req.query.passengerInfo);

  return duffel.orders.create({
    selected_offers: [flightInfo.id],
    payments: [
      {
        type: "balance",
        currency: flightInfo.total_currency,
        amount: flightInfo.total_amount
      }
    ],
    passengers: [
      {
        phone_number: passengerInfo.phoneNumber,
        email: passengerInfo.email,
        born_on: passengerInfo.dateOfBirth,
        title: passengerInfo.title,
        gender: passengerInfo.gender,
        family_name: passengerInfo.lastName,
        given_name: passengerInfo.firstName,
        id: flightInfo.passengers[0].id
      }
    ]
  })
  .then((response) => {
    console.log('BOOKING SERVER REAPONSE:::', response.data)
    res.status(200).send(response.data)
  })
  .catch((err) => {
    console.error('BOOKING FAILURE::::::', err)
    res.sendStatus(500)
  })


})
