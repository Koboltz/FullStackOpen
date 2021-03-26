
const Weather = ({weather}) => {
    if (weather === undefined) {
      return (
        <p>Loading...</p>
      )
    }
  
    return (
      <div>
        <p><strong>Temperature:</strong> {weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons[0]} alt=''/>
        <p><strong>Wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    )
  }

export default Weather