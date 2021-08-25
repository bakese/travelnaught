import React from 'react';
import moment from 'moment';

const Flight = ({flightInfo, bookFlight}) => {

  console.log(flightInfo)

  return (
    <div className='flight'>

      <div>
        <h3>{moment(flightInfo.slices[0].segments[0].departing_at).format('LT')} - {moment(flightInfo.slices[0].segments[0].arriving_at).format('LT')}</h3>
        <h3>{flightInfo.owner.name}</h3>
        {/* <img src="../assets/AA.jpg"></img> */}
        <h3>{flightInfo.slices[0].origin.iata_city_code}</h3>
        <h3>{flightInfo.slices[0].destination.iata_city_code}</h3>
      </div>

      <div>
        <h3>{moment(flightInfo.slices[1].segments[0].departing_at).format('LT')} - {moment(flightInfo.slices[1].segments[0].arriving_at).format('LT')}</h3>
        <h3>{flightInfo.slices[1].origin.iata_city_code}</h3>
        <h3>{flightInfo.slices[1].destination.iata_city_code}</h3>
      </div>

      <h3>price ${flightInfo.total_amount}</h3>

      <button onClick={() => bookFlight(flightInfo)}>Book Now</button>

    </div>
  )
}

export default Flight;