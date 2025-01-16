import React, { useState } from "react";
import "./SearchComponent.css";

function SearchComponent({
  setKeyword,
  favorites,
  setFavorites, // 즐겨찾기 목록 업데이트
  onFavoriteClick, // 즐겨찾기 항목을 클릭할 때 실행되는 함수
}) {
  const [inputValue, setInputValue] = useState(""); // 검색어

  const handleSearch = () => {
    setKeyword(inputValue);
  };

  // 즐겨찾기 항목 제거
  const handleRemoveFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((fav) => fav.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
          onChange={(e) => setInputValue(e.target.value)} // 입력값이 변경될 때 상태 업데이트
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
