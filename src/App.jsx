import { useEffect, useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import SearchComponent from "./components/SearchComponent";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [keyword, setKeyword] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);
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
