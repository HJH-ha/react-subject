import React from "react";
import "./Navbar.css";
import GPS from "../assets/gps.png";
import Park from "../assets/park.png";

function Navbar({ setUserPosition }) {
  const handleLogoClick = () => {
    window.location.reload();
  };

  const locateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ lat: latitude, lng: longitude });
      });
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={Park} />
        <h1>주차장 검색</h1>
      </div>
      <div className="navbar-links">
        <button
          className="current-btn"
          type="button"
          onClick={locateCurrentPosition}
        >
          <img className="current-img" src={GPS} />
          <p>최근 검색 위치</p>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
