import React from 'react';
import moment from 'moment';

const Flight = ({flightInfo}) => {

  console.log(flightInfo)

  return (
    <div className='flight'>
      <h3>{moment(flightInfo.slices[0].segments[0].departing_at).format('LT')} - {moment(flightInfo.slices[0].segments[0].arriving_at).format('LT')}</h3>




    </div>
  )
}

export default Flight;