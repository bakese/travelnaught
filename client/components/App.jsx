import React, { useState } from 'react';
import axios from 'axios';
import Flight from './Flight.jsx';


const App = () => {

  const [flights, setFlights] = useState([])

  const searchFlight = () => {
    axios.get('/offer_request')
    .then((response) => {
      // console.log('success', response.data)
      setFlights(response.data)
    })
    .catch((err) => console.error(err))
  }

  return (
    <div>
      <h1>Travelnaughts</h1>
      <button onClick={searchFlight}>Search flight</button>

      {flights.map((flight, i) => {
        return <Flight key={i} flightInfo={flight}/>
      })}


    </div>
  )

}

export default App;