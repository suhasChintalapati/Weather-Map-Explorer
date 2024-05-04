import React from 'react'
import './WeatherHorizontalCard.css'
import { SlLocationPin } from "react-icons/sl";

function WeatherHorizontalCard() {
  return (
    
      <div className="hCard">
        <div className="leftCard">
        <div className="icon"><SlLocationPin /> 
        <h2 className=" display-6">Hyderabad</h2></div>
        <p className="display-6">12<sup className='h4'>th</sup>March</p>
        </div>
        <div className="rightCard">
        <img src="https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg" alt="Sunny" height={"250px"} />

        </div>
       
      </div>
  )
}

export default WeatherHorizontalCard