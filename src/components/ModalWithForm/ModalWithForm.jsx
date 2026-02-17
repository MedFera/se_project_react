import { useEffect, useState } from "react";
import "./ModalWithForm.css";
const base = import.meta.env.BASE_URL; // "/se_project_react/" in production

function ModalWithForm({ isVisible, exitClick, title, children, formValid, onSubmit,buttonText}) {
  const [display, setDisplay] = useState("none");
  const [buttonDisabled, setButtonDisabled] = useState(true);
 

  useEffect(() => {
    setDisplay(isVisible ? "block" : "none");
  }, [isVisible]);

  useEffect(() => {
    if (formValid){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true);
    }
  }, [formValid]);

  const handleClick = (e) => {
    if (e.target.classList.contains("form-modal")) {
      exitClick();
    }
  };

  const handleSubmit = (e) => {
    if (formValid) {
      e.preventDefault();
      onSubmit(e);
      exitClick();
      setButtonDisabled(true);
      e.target.reset();
    }
  };

  return (
    <div
      className="form-modal"
      style={{ display: `${display}` }}
      onClick={handleClick}
    >
      <div className="form-modal__container">
        <img
          className="item-modal__close-btn"
          src={`${base}images/close-btn-dark.svg`}
          alt="close button"
          onClick={exitClick}
        />
        <h3 className="form-modal__title">{title}</h3>
        <form id={title} onSubmit={handleSubmit}>
          {children}
          <button
            className="form-modal__submit-btn"
            type="submit"
            disabled={buttonDisabled}
            form={title}
             
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
