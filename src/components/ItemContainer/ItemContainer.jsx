import ItemCard from "/src/components/ItemCard/ItemCard";
import "./ItemContainer.css";
import { useEffect, useState } from "react";

function ItemContainer({ clothingArray, weatherData, onItemClick }) {
  const [condition, setCondition] = useState("warm");
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (weatherData) {
      let temp = weatherData.main.temp;

      if (temp < 66) {
        setCondition("cold");
      } else if (66 <= temp && temp < 86) {
        setCondition("warm");
      } else {
        setCondition("hot");
      }
    }
  }, [weatherData]);

  useEffect(() => {
    setFilteredItems(
      clothingArray.filter((item) => item.weather === condition),
    );
  }, [clothingArray, condition]);

  return (
    <ul className="item-container">
      {filteredItems.map((item) => {
        return (
          <ItemCard
            key={item._id ?? item.name}
            cardObj={item}
            onClick={onItemClick}
          />
        );
      })}
    </ul>
  );
}

export default ItemContainer;
