import ItemCard from "/src/components/ItemCard/ItemCard";
import "./ItemContainer.css";
import { useEffect, useState } from "react";

function ItemContainer({ clothingArray, weatherObj, onItemClick }) {
  const [condition, setCondition] = useState("warm");
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (weatherObj) {
      let temp = weatherObj.main.temp;

      if (temp < 66) {
        setCondition("cold");
      } else if (66 < temp && temp < 86) {
        setCondition("warm");
      } else {
        setCondition("hot");
      }
    }
  }, [weatherObj]);

  useEffect(() => {
    setFilteredItems(
      clothingArray.filter((item) => item.weather === condition),
    );
  }, [clothingArray, condition]);

  return (
    <div className="item-container">
      {filteredItems.map((item) => {
        return (
          <ItemCard
            key={item._id ?? item.name}
            cardObj={item}
            onClick={onItemClick}
          />
        );
      })}
    </div>
  );
}

export default ItemContainer;
