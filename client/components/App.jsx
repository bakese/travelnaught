import React, { useState } from 'react';
import axios from 'axios';


const App = () => {

  const searchFlight = () => {
    axios.get('/flights')
    .then((response) => console.log('success'))
    .catch((err) => console.error(err))
  }

  return (
    <div>
      <h1>Travelnaughts</h1>
      <button onClick={searchFlight}>Search flight</button>
    </div>
  )

}

export default App;