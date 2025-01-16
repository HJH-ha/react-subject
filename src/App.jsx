import { useEffect, useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import SearchComponent from "./components/SearchComponent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [keyword, setKeyword] = useState(""); // 검색어 저장
  const [favorites, setFavorites] = useState([]); // 즐겨찾기 리스트 저장
  const [selectedFavorite, setSelectedFavorite] = useState(null); // 선택된 즐겨찾기 정보 저장
  const [userPosition, setUserPosition] = useState(null); // 위치 저장

  // 로컬스토리지에서 즐겨찾기 불러옴
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // favorites 상태가 바뀔 때마다 로컬스토리지에 즐겨찾기 저장
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]); // favorites가 변경될 떄마다 실행

  return (
    <div>
      <Navbar setUserPosition={setUserPosition} />
      <h1 className="name">지도 검색</h1>
      <SearchComponent
        setKeyword={setKeyword}
        favorites={favorites}
        setFavorites={setFavorites}
        onFavoriteClick={setSelectedFavorite}
      />
      <MapComponent
        keyword={keyword}
        favorites={favorites}
        setFavorites={setFavorites}
        selectedFavorite={selectedFavorite}
        userPosition={userPosition}
      />
      <Footer />
    </div>
  );
}

export default App;
