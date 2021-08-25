import React, { useState } from 'react';
import axios from 'axios';
import Flight from './Flight.jsx';
import LoaderModal from './LoaderModal.jsx';
import BookingModal from './BookingModal.jsx';
import ResultModal from './ResultModal.jsx';


const App = () => {

  const [flights, setFlights] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [loaderModal, setLoaderModal] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState('');
  const [bookingModal, setBookingModal] = useState(false);
  const [bookingFlight, setBookingFlight] = useState([]);
  const [bookingResult, setBookingResult] = useState('');
  const [resultModal, setResultModal] = useState(false);
  const [bookingRef, setBookingRef] = useState('')

  const searchFlights = () => {
    event.preventDefault()
    setLoadingPhrase('Searching')
    setLoaderModal(true)
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
      // console.log('GOT SEARCH RESULTS')
      setLoaderModal(false)
      setLoadingPhrase('')
      setFlights(response.data)
    })
    .catch((err) => {
      console.error(err)
      setLoadingPhrase('')
      setLoaderModal(false)
    })
  }

  const bookingInfoModal = (flightInfo) => {
    event.preventDefault()
    // console.log('FLIGHT PICKED', flightInfo)
    setBookingFlight(flightInfo)


    setBookingModal(true)

  }

  const bookFlight = (passengerInfo) => {
    event.preventDefault()
    setLoadingPhrase('Booking')
    setLoaderModal(true)
    setBookingModal(false)

    var data = {
      flightInfo: bookingFlight,
      passengerInfo: passengerInfo
    }

    axios.get('/create_order', {
      params: data
    })

    .then((response) => {
      console.log('booking success!!!!!!!!!!!!!!!!!!!!')
      setBookingRef(response.data)
      setLoaderModal(false)
      setLoadingPhrase('')
      setBookingResult('Success! Your flight is booked')
      setResultModal(true)
    })
    .catch((err) => {
      setLoaderModal(false)
      setLoadingPhrase('')
      setBookingResult('There was an error :( Please try again later')
      setResultModal(true)
      console.error('Booking request error:', err)
    })

  }





  return (
    <div className="main">
      <h1>Wander</h1>

      <div className="searchBar">
        <input className="inputForm" placeholder="Origin" value={origin} onChange={(e) => setOrigin(e.target.value)}/>
        <input className="inputForm" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)}/>
        <input className="inputForm" placeholder="Depart Date" value={departDate} onChange={(e) => setDepartDate(e.target.value)}/>
        <input className="inputForm" placeholder="Return Date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)}/>
        <button onClick={searchFlights}>Search Flights</button>
      </div>

      {loaderModal && <LoaderModal phrase={loadingPhrase}/>}
      {bookingModal && <BookingModal bookFlight={bookFlight} setBookingModal={setBookingModal}/>}
      {resultModal && <ResultModal bookingRef={bookingRef} bookingResult={bookingResult} setResultModal={setResultModal}/>}

      {/* render flights from search results */}
      <div className="flightsList">
        {flights.map((flight, i) => {
          return <Flight key={i} flightInfo={flight} bookingInfoModal={bookingInfoModal}/>
        })}
      </div>
    </div>
  )

}

export default App;