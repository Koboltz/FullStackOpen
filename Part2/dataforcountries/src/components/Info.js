import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

const Info = (props) => {
    const [weather, setWeather] = useState();
    //console.log(city)
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${props.country.capital}`
    useEffect(() => {
      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
      //  console.log(weather)
    }, [url])
  
    return (
      <div>
        <h2>{props.country.name}</h2><br />
        <p>capital: {props.country.capital}</p>
        <p>population: {props.country.population}</p><br />
        <h2>languages</h2>
        <ul>
          {
            props.country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)
          }
        </ul>
        <img src={props.country.flag} alt={props.country.name} style={{width: 200, height: 100}}/><br />
        <h2>Weather in {props.country.capital}</h2><br />
        <Weather weather={weather}/>
      </div>
    )
  }

  export default Info;