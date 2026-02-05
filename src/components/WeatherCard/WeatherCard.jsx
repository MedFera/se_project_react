import "./WeatherCard.css";
import { useState, useEffect } from "react";



const weatherOptions = {
  "Clear_Day": "src/assets/images/weatherOptions/Clear_Day.svg",
  "Clear_Night": "src/assets/images/weatherOptions/Clear_Night.svg",
  "Clouds_Day": "src/assets/images/weatherOptions/Cloudy_Day.svg",
  "Clouds_Night": "src/assets/images/weatherOptions/Cloudy_Night.svg",
  "Fog_Day": "src/assets/images/weatherOptions/Fog_Day.svg",
  "Fog_Night": "src/assets/images/weatherOptions/Fog_Night.svg",
  "Rain_Day": "src/assets/images/weatherOptions/Rain_Day.svg",
  "Rain_Night": "src/assets/images/weatherOptions/Rain_Night.svg",
  "Snow_Day": "src/assets/images/weatherOptions/Snow_Day.svg",
  "Snow_Night": "src/assets/images/weatherOptions/Snow_Night.svg",
};

function WeatherCard({weatherObj}) {
  const [weather, setWeather] = useState("Clear_Day");
  const [temperature, setTemperature] = useState(78);


  function findWeather () {
    let weatherString = "";
    try {
      let currentTime = weatherObj.dt;
      let weatherType = weatherObj.weather[0].main;
      let sunrise = weatherObj.sys.sunrise;
      let sunset = weatherObj.sys.sunset;
      let temp = weatherObj.main.temp;
      weatherString += weatherType;
      if (currentTime > sunrise && currentTime < sunset){
        weatherString += "_Day"
      }
      else {
        weatherString += "_Night"
      }
      setWeather(weatherString);
      setTemperature(temp);
    } catch (error) {
      console.error(error);
      setWeather("Clear_Day");
    }
    
  };

  useEffect(()=>{
    if (!weatherObj) return;
    findWeather();
  },[weatherObj])

  return (
    <div className="weather-card">
      <div className="weather-card_img" style={{ backgroundImage: `url(${weatherOptions[weather]})` }}>
        <h1 className="weather-card_temp">{temperature}&#xB0;F</h1>
      </div>
    </div>
    
  );
}

export default WeatherCard;
