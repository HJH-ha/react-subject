import React from "react";
import "./Navbar.css";
import "../assets/gps.png";
import "../assets/park.png";

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
        <img src="../src/assets/park.png" />
        <h1>주차장 검색</h1>
      </div>
      <div className="navbar-links">
        <button
          className="current-btn"
          type="button"
          onClick={locateCurrentPosition}
        >
          <img className="current-img" src="../src/assets/gps.png" />
          <p>최근 검색 위치</p>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
