import { useEffect, useState } from 'react';
import './ItemModal.css'




function ItemModal({isVisible, onClick, card}) {
  const [display, setDisplay] = useState("none");
  const [item, setItem] = useState({weather:"", name:"",link:""})

  useEffect(()=>{
    setDisplay(isVisible ? "block" : "none")
    setItem(card);
  },[isVisible,card]);

  const handleClick = (e) => {
    if (e.target.classList.contains('item-modal')) {
      onClick()
    }
  }
  
  return (
    <div
        className="item-modal"
        style={{display: `${display}`  }}
        onClick={handleClick}
      >
        <div className="item-modal__container">
          <img className='item-modal__close-btn' src='src/assets/images/close-btn.svg' alt='close button' onClick={onClick}/>
          <div>
            <img className='item-modal__image' src={item?.link}/>
          <div className='item-modal__description'>
            <div>{item?.name}</div>
            <div>Weather: {item?.weather}</div>
          </div>
          </div>
          
        </div>
    </div>
  );
}

export default ItemModal;