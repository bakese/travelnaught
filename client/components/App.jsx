import React, { useState } from 'react';
import axios from 'axios';
import Flight from './Flight.jsx';


const App = () => {

  const [flights, setFlights] = useState([])

  const searchFlights = () => {
    axios.get('/offer_request')
    .then((response) => {
      setFlights(response.data)
    })
    .catch((err) => console.error(err))
  }

  const bookFlight = (flightInfo) => {
    event.preventDefault()
    console.log('booking', flightInfo)

    axios.get('/create_order', {
      params: flightInfo
    })

    .then((response) => {
      console.log('booking success')
    })
    .catch((err) => console.error(err))

  }


  return (
    <div>
      <h1>Travel Stuff</h1>
      <button onClick={searchFlights}>Search flight</button>

      {flights.map((flight, i) => {
        return <Flight key={i} flightInfo={flight} bookFlight={bookFlight}/>
      })}


    </div>
  )

}

export default App;