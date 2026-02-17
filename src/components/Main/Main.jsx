
import WeatherCard from '../WeatherCard/WeatherCard'
import ItemContainer from '../ItemContainer/ItemContainer'


function Main({clothingArray,weatherData,onItemClick}) {

  return (
    <>
      <WeatherCard weatherData={weatherData}></WeatherCard>
      <ItemContainer clothingArray = {clothingArray} weatherData={weatherData} onItemClick={onItemClick}></ItemContainer>
    </>
  )
}

export default Main
