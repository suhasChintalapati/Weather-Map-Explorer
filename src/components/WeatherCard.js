import React from 'react'
import './WeatherCard.css'


function WeatherCard() {
  return (
    <div className='main' >
        <div className='cardHeader mb-3 rounded'>
             <h3 className="display-6">Monday</h3>
        </div>
        <div className='card rounded'> 
        <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" alt="Sunny" height={"50%"} />
      
        <h1>21&deg;C</h1>
        <p className="lead">Wind Speed:20.2 miles/hr</p>
        <p className="lead">Humidity:20.2 miles/hr</p>
        </div>
    </div>
  )
}

export default WeatherCard