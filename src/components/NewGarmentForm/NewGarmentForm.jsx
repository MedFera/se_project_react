import { useEffect, useState } from "react";
import "./NewGarmentForm.css";
const base = import.meta.env.BASE_URL; // "/se_project_react/" in production

function NewGarmentForm({ formValid, setFormValid }) {
  const [itemName, setItemName] = useState("");
  const [itemUrl, setItemUrl] = useState("");

  useEffect(() => {
  
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

    if (itemNameValid(itemName) && itemUrlValid(itemUrl)) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [itemName, itemUrl]);

  useEffect(() => {
    if (!formValid) {
      //used to reset form
      setItemName("");
      setItemUrl("");
    }
  }, [formValid]);

  return (
    <>
      <div className="garment-modal__input">
        <label htmlFor="item-name">Name</label>
        <input
          className="garment-modal__input-txt"
          type="text"
          placeholder="Name"
          id="item-name"
          name="item-name"
          autoComplete="name"
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="garment-modal__input">
        <label htmlFor="item-url">Image</label>
        <input
          className="garment-modal__input-txt"
          type="url"
          placeholder="Image URL"
          id="item-url"
          name="item-url"
          onChange={(e) => setItemUrl(e.target.value)}
        />
      </div>
      <div className="garment-modal__radio">
        <div>Select the weather type:</div>
        <div>
          <label  className="garment-modal__radio-label">
            <input
              className="garment-modal__radio-btn"
              type="radio"
              name="item-weather"
              value={"hot"}
              id="weatherType1"
              defaultChecked
            />
            Hot
          </label>
        </div>
        <div>
          <label  className="garment-modal__radio-label">
            <input
              className="garment-modal__radio-btn"
              type="radio"
              name="item-weather"
              value={"warm"}
              id="weatherType2"
            />
            Warm
          </label>
        </div>
        <div>
          <label className="garment-modal__radio-label">
            <input
              className="garment-modal__radio-btn"
              type="radio"
              name="item-weather"
              value={"cold"}
              id="weatherType3"
            />
            Cold
          </label>
        </div>
      </div>
    </>
  );
}

export default NewGarmentForm;
