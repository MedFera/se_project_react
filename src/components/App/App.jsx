import { useEffect, useState } from "react";
import "./App.css";
import Header from "/src/components/Header/Header";
import Footer from "../Footer/Footer";

import { WeatherApi } from "../../utils/WeatherApi";
import { defaultClothingItems } from "../../utils/clothingItems";
import ItemModal from "../ItemModal/ItemModal";
import Main from "/src/components/Main/Main";
import NewGarmentForm from "../NewGarmentForm/NewGarmentForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const testMode = false;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingArray, setClothingArray] = useState(defaultClothingItems);
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [garmFormValid, setGarmFormValid] = useState(false);

  useEffect(() => {
    //console.log(weatherData)
    //USE TEST MODE TO STOP USELESS API CALLS!
    if (testMode) {
      return;
    }
    const api = new WeatherApi({
      longitude: "-73.935242",
      latitude: "40.730610",
    });
    api
      .getWeatherObj()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((err) => console.error(err));
  }, []);


  const handleItemClick = (item) => {
    setSelectedCard(item);
    setItemModalVisible(true);
  };

  const handleAddItemClick = () => {
    setFormModalVisible(true);
  };

  const handleModalExit = () => {
    if (itemModalVisible) {
      setItemModalVisible(false);
    } else if (formModalVisible) {
      setFormModalVisible(false);
    }
  };

  const addItemToArray = (newItem) => {
    const _nextId = clothingArray.length;
    newItem._id = _nextId + 1;
    setClothingArray([...clothingArray, newItem]);
  };

  const handleGarmSubmit = (e) => {
    const formData = new FormData(e.target);
   
    const data = {
      name: formData.get("item-name"),
      link: formData.get("item-url"),
      weather: formData.get("item-weather"),
    };

    addItemToArray(data);
    setGarmFormValid(false);
  };

  return (
    <>
      <ItemModal
        isVisible={itemModalVisible}
        card={selectedCard}
        onClick={handleModalExit}
      ></ItemModal>
      <ModalWithForm
        isVisible={formModalVisible}
        exitClick={handleModalExit}
        title={"New Garment"}
        formValid={garmFormValid}
        onSubmit={handleGarmSubmit}
        buttonText={"Add Garment"}
        children={
          <NewGarmentForm
            formValid={garmFormValid}
            setFormValid={setGarmFormValid}
          ></NewGarmentForm>
        }
      ></ModalWithForm>
      <Header
        addItemClick={handleAddItemClick}
        weatherData={weatherData}
      ></Header>
      <Main
        weatherData={weatherData}
        clothingArray={clothingArray}
        onItemClick={handleItemClick}
      ></Main>
      <Footer></Footer>
      {/* <button onClick={addTestItem}></button> */}
    </>
  );
}

export default App;
