import { useEffect, useState } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ isVisible, exitClick, addItemToArray }) {
  const [display, setDisplay] = useState("none");
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [itemWeather, setItemWeather] = useState("hot");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    setDisplay(isVisible ? "block" : "none");
  }, [isVisible]);

  useEffect(() => {
    // console.log("Name: " + itemName)
    // console.log("URL: " + itemUrl)
    const itemNameValid = (itemName) => {
      if (itemName == "") {
        return false;
      }
      return true;
    };

    const itemUrlValid = (itemUrl) => {
      try {
        new URL(itemUrl);
        return true;
      } catch (err) {
        return false;
      }
    };
    // console.log(itemNameValid(itemName))
    // console.log(itemUrlValid(itemUrl))
    if (itemNameValid(itemName) && itemUrlValid(itemUrl)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [itemName, itemUrl]);

  const handleClick = (e) => {
    if (e.target.classList.contains("form-modal")) {
      exitClick();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log({ itemName, itemUrl, itemWeather });
    addItemToArray({ name: itemName, weather: itemWeather, link: itemUrl });
    exitClick();
    setButtonDisabled(true);
    setItemName("")
    setItemUrl("")
    console.log(e.target.reset())
  };

  return (
    <div
      className="form-modal"
      style={{ display: `${display}`}}
      onClick={handleClick}
    >
      <div className="form-modal__container">
        <img
          className="item-modal__close-btn"
          src="/src/assets/images/close-btn-dark.svg"
          alt="close button"
          onClick={exitClick}
        />
        <h3 className="form-modal__title">New garment</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-modal__input">
            <label>Name</label>
            <input
              className="form-modal__input-txt"
              type="text"
              placeholder="Name"
              id="name"
              autoComplete="name"
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="form-modal__input">
            <label>Image</label>
            <input
              className="form-modal__input-txt"
              type="url"
              placeholder="Image URL"
              id="url"
              onChange={(e) => setItemUrl(e.target.value)}
            />
          </div>
          <div className="form-modal__radio">
            <div>Select the weather type:</div>
            <div>
              <label htmlFor="weatherType1" className="form-modal__radio-label">
                <input
                  className="form-modal__radio-btn"
                  type="radio"
                  name="weather"
                  value={"hot"}
                  id="weatherType1"
                  onChange={(e) => setItemWeather(e.target.value)}
                  defaultChecked
                />
                Hot
              </label>
            </div>
            <div>
              <label htmlFor="weatherType2" className="form-modal__radio-label">
                <input
                  className="form-modal__radio-btn"
                  type="radio"
                  name="weather"
                  value={"warm"}
                  id="weatherType2"
                  onChange={(e) => setItemWeather(e.target.value)}
                />
                Warm
              </label>
            </div>
            <div>
              <label htmlFor="weatherType3" className="form-modal__radio-label">
                <input
                  className="form-modal__radio-btn"
                  type="radio"
                  name="weather"
                  value={"cold"}
                  id="weatherType3"
                  onChange={(e) => setItemWeather(e.target.value)}
                />
                Cold
              </label>
            </div>
          </div>
          <button
            className="form-modal__submit-btn"
            type="submit"
            disabled={buttonDisabled}
          >
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
