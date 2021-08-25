import React, { useState } from 'react';

const BookingModal = ({bookFlight, setBookingModal}) => {

  // console.log('booking modal', bookFlight)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [dateOfBirth, SetDateOfBirth] = useState('')

  return (

    <div className="loaderModal bookingModal">
      <h2>Passenger Info</h2>
      <input className="inputForm" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      <input className="inputForm" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      <input className="inputForm" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <input className="inputForm" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
      <input className="inputForm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input className="inputForm" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
      <input className="inputForm" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => SetDateOfBirth(e.target.value)}/>
      <button onClick={() => bookFlight({firstName, lastName, title, gender, email, phoneNumber, dateOfBirth})}>Confirm Booking</button>
      <button onClick={() => setBookingModal(false)} >Close</button>
    </div>

  )
}

export default BookingModal;