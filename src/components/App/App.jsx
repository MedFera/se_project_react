import { useEffect, useState } from 'react'
import './App.css'
import Header from '/src/components/Header/Header'
import Footer from '../Footer/Footer'

import { weatherApi } from '../../utils/weatherApi'
import {defaultClothingItems} from "../../utils/clothingItems"
import ItemModal from '../ItemModal/ItemModal'
import Main from "/src/components/Main/Main"
import ModalWithForm from '../ModalWithForm/ModalWithForm'

const testMode = false;
 

function App() {
  const [weatherObj, setWeatherObj] = useState(null);
  const [clothingArray, setClothingArray] = useState(defaultClothingItems);
  const [itemModalVisible, setItemModalVisible] = useState(false)
  const [formModalVisible, setFormModalVisible] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(()=>{
    //console.log(weatherObj)
    //USE TEST MODE TO STOP USELESS API CALLS!
    if (testMode) {return} 
    const api = new weatherApi({
        longitude: "-73.935242",
        latitude: "40.730610"
    })
    api.getWeatherObj()
    .then(data => {
      setWeatherObj(data);
    })
    .catch(err => console.error(err))
  },[])

  const handleItemClick =(item)=>{
    setSelectedCard(item)
    setItemModalVisible(true)
  }

  const handleAddItemClick = () => {
    setFormModalVisible(true)
  }

  const handleModalExit = () =>{
    if (itemModalVisible){
      setItemModalVisible(false)
    }
    else if(formModalVisible){
      setFormModalVisible(false)
    }
    
    
  }
  
  const addItemToArray = (newItem) =>{
    const _nextId = clothingArray.length;
    newItem._id = _nextId + 1
    setClothingArray([...clothingArray, newItem])
  }

  const addTestItem = () => {
    setClothingArray(prev => [
      ...prev,
      {
        _id: 99,
        name: "TESTER",
        weather: "warm",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
      }
    ]);
  };

  return (
    <>
      <ItemModal isVisible={itemModalVisible} card={selectedCard} onClick={handleModalExit} ></ItemModal>
      <ModalWithForm isVisible={formModalVisible} exitClick={handleModalExit} addItemToArray={addItemToArray}></ModalWithForm>
      <Header addItemClick={handleAddItemClick} weatherObj={weatherObj}></Header>
      <Main weatherObj={weatherObj} clothingArray = {clothingArray} onItemClick={handleItemClick}></Main>
      <Footer></Footer>
      {/* <button onClick={addTestItem}></button> */}
    </>
  )
}

export default App
