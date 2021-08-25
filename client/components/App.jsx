import React, { useState } from 'react';
import axios from 'axios';
import Flight from './Flight.jsx';



const App = () => {

  const [flights, setFlights] = useState([])
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [departDate, setDepartDate] = useState('')
  const [returnDate, setReturnDate] = useState('')

  const searchFlights = () => {
    event.preventDefault()
    // console.log(origin, destination, departDate, returnDate)

    var data =  {
      origin: origin,
      destination: destination,
      departDate: departDate,
      returnDate: returnDate
    }

    axios.get('/offer_request', {
      params: data
    })
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
    <div className="main">
      <h1>Wander</h1>

      <div className="searchBar">
        <input placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)}/>
        <input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)}/>
        <input placeholder="Depart Date" value={departDate} onChange={(e) => setDepartDate(e.target.value)}/>
        <input placeholder="Return Date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)}/>

        <button onClick={searchFlights}>Search flight</button>
      </div>

      {/* render flights from search results */}
      {flights.map((flight, i) => {
        return <Flight key={i} flightInfo={flight} bookFlight={bookFlight}/>
      })}


    </div>
  )

}

export default App;