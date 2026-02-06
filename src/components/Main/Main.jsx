
import WeatherCard from '../WeatherCard/WeatherCard'
import ItemContainer from '../ItemContainer/ItemContainer'


function Main({clothingArray,weatherObj,onItemClick}) {

  return (
    <>
      <WeatherCard weatherObj={weatherObj}></WeatherCard>
      <ItemContainer clothingArray = {clothingArray} weatherObj={weatherObj} onItemClick={onItemClick}></ItemContainer>
    </>
  )
}

export default Main
