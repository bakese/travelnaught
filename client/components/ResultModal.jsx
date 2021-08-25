import React from 'react';

const ResultModal = ({bookingResult, setResultModal, bookingRef}) => {

  console.log('RESULT MODAL', bookingRef)

  return (
    <div className="sweet-loading loaderModal">
      <h3>{bookingResult}</h3>
      <h4>Your booking reference is: {bookingRef.booking_reference}</h4>
      <button onClick={() => setResultModal(false)}>X</button>
    </div>
  )
}

export default ResultModal;