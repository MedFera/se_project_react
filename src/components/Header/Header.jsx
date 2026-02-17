import { useEffect, useState } from "react";
import "./Header.css";

const base = import.meta.env.BASE_URL; // "/se_project_react/" in production

function Header({ addItemClick, weatherData }) {
  const [location, setLocation] = useState("N/A");
  const [date, setDate] = useState("January 1");
  useEffect(() => {
    if(weatherData != null){
      setLocation(weatherData.name);
      //Multply to get milliseconds
      setDate(new Date(weatherData.dt * 1000).toLocaleString("default", { month: "long", day: "numeric" }));
    }

  }, [weatherData]);

  return (
    <div className="header">
      <div className="header__left">
        <img
          className="header__logo"
          src={`${base}images/logo.svg`}
          alt="WTWR logo"
        />
        <div className="header__datetime">
          {date}, {location}
        </div>
      </div>

      <div className="header__right">
        <button className="header__add-button" onClick={addItemClick}>
          + Add Clothes
        </button>
        <div className="header__account-name">Terrence Tegegne</div>
        <img
          className="header__avatar"
          src={`${base}images/avatar.svg`}
          alt="User avatar"
        />
      </div>
    </div>
  );
}

export default Header;
