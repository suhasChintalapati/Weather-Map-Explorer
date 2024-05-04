import React from 'react'
import './Weather.css'
import axios from 'axios';
import WeatherCard from './WeatherCard';
import WeatherHorizontalCard from './WeatherHorizontalCard';

function Weather(props) {
    const latitude=props.newPlace.lat;
    const longitude=props.newPlace.long;
    const key=process.env.REACT_APP_WEATHER_ACCESS_TOKEN;
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}&units=imperial`)
    .then(responce=>{
        console.log("weather data",responce);
        // console.log(responce.data.lenght);
    })
    .catch(err=>{
        console.log(err.message)
    })
  
  return (
    <div className='weather '>
      <div className="mainweather rounded">
      <WeatherHorizontalCard />
      </div>
      <div className="dailyweather">
       <WeatherCard />
       <WeatherCard />
       <WeatherCard />
       <WeatherCard />
       <WeatherCard />
       </div>
    </div>
  )
}

export default Weather