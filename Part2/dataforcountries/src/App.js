import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './components/Results';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState('');
  


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
    }, []);
  


  const handleFilterChange = ({target}) => {
    setFilter(target.value)
  }

  const handleShow = ({target}) => {
    setFilter(target.value)
  }


  return (
    <div>
      <p>find countries: </p>
      <input onChange={handleFilterChange}/><br />
      <Results countries={countries} filter={filter} handleShow={handleShow} />
    </div>
  )
}

export default App;
