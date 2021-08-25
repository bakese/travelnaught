import React from 'react';
import moment from 'moment';

const Flight = ({flightInfo, bookingInfoModal}) => {

  // console.log(flightInfo)

  return (
    <div className="ticketStub">
      <div className='flight'>
        {/* Outbound flight */}
        <div className="subFlight">
          <h3 className="ticketInfo">{flightInfo.slices[0].segments[0].marketing_carrier.name}</h3>
          <div className="ticketInfo">
            <h3>{flightInfo.slices[0].origin.iata_city_code}</h3>
            <h3>{moment(flightInfo.slices[0].segments[0].departing_at).format('LT')}</h3>
          </div>
          <h3 className="ticketInfo">---></h3>
          <div className="ticketInfo">
            <h3>{moment(flightInfo.slices[0].segments[0].arriving_at).format('LT')}</h3>
            <h3>{flightInfo.slices[0].destination.iata_city_code}</h3>
          </div>
        </div>
        {/* Return flight */}
        <div className="subFlight">
          <h3 className="ticketInfo">{flightInfo.slices[1].segments[0].marketing_carrier.name}</h3>
          <div className="ticketInfo">
            <h3>{flightInfo.slices[1].origin.iata_city_code}</h3>
            <h3>{moment(flightInfo.slices[1].segments[0].departing_at).format('LT')}</h3>
          </div>
          <h3 className="ticketInfo">---></h3>
          <div className="ticketInfo">
            <h3>{moment(flightInfo.slices[1].segments[0].arriving_at).format('LT')}</h3>
            <h3>{flightInfo.slices[1].destination.iata_city_code}</h3>
          </div>
        </div>
      </div>
      <div className="flight">
        <h3>Price ${flightInfo.total_amount}</h3>
        <button onClick={() => bookingInfoModal(flightInfo)}>Book Now</button>
      </div>
    </div>

  )
}

export default Flight;