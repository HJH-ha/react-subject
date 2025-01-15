import React, { useState } from "react";
import "./SearchComponent.css";

function SearchComponent({
  setKeyword,
  favorites,
  setFavorites,
  onFavoriteClick,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setKeyword(inputValue);
  };

  const handleRemoveFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((fav) => fav.id !== id);
      return updatedFavorites;
    });
  };

  return (
    <div className="search-container">
      <div>
        <input
          type="text"
          className="search-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="장소를 입력하세요"
        />
        <button onClick={handleSearch} className="search-button">
          검색
        </button>
      </div>

      <div className="favorites">
        <h3>즐겨찾기⭐</h3>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <li key={fav.id} onClick={() => onFavoriteClick(fav)}>
                {fav.place_name}
                <button onClick={() => handleRemoveFavorite(fav.id)}>
                  삭제
                </button>
              </li>
            ))
          ) : (
            <p>즐겨찾기가 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SearchComponent;
