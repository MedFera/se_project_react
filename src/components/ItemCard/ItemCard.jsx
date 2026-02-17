import "./ItemCard.css";
import { useState } from "react";

function ItemCard({ cardObj, onClick }) {
  return (
    <li>
      <div
        className="item-card"
        style={{ backgroundImage: `url(${cardObj.link})` }}
        onClick={() => onClick(cardObj)}
      >
        <div className="item-card_name">{cardObj.name}</div>
      </div>
    </li>
  );
}

export default ItemCard;
