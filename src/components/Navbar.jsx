import React from "react";
import "./Navbar.css";

function Navbar() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src="../src/assets/park.png" />
        <h1>주차장 검색</h1>
      </div>
      <div className="navbar-links"></div>
    </div>
  );
}

export default Navbar;
