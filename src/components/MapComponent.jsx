import React, { useEffect, useRef, useState } from "react";
import "./MapComponent.css";

function MapComponent({
  keyword,
  favorites,
  setFavorites,
  selectedFavorite,
  userPosition,
}) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRefs = useRef([]);
  const overlayRefs = useRef([]);
  const [parks, setParks] = useState([]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const kakao = window.kakao;
    const container = mapRef.current;

    const options = {
      center: userPosition
        ? new kakao.maps.LatLng(userPosition.lat, userPosition.lng)
        : new kakao.maps.LatLng(35.1795543, 129.0756416),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    mapInstance.current = map;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const center = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(center);

        ps.categorySearch(
          "PK6",
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              setParks(data);
              addMarkers(data, map);
            }
          },
          { location: center, radius: 5000 }
        );
      } else {
        console.log("주소를 찾을 수 없습니다.");
      }
    });

    const addMarkers = (data, map) => {
      markerRefs.current.forEach((marker) => marker.setMap(null));
      overlayRefs.current.forEach((overlay) => overlay.setMap(null));
      markerRefs.current = [];
      overlayRefs.current = [];

      data.forEach((place) => {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(place.y, place.x),
          map: map,
        });
        markerRefs.current.push(marker);

        const overlayContent = document.createElement("div");
        overlayContent.innerHTML = `<div style="background: white; border: 1px solid #ccc; padding: 5px; border-radius: 5px;">${place.place_name}</div>`;
        overlayContent.style.whiteSpace = "nowrap";

        const overlay = new kakao.maps.CustomOverlay({
          content: overlayContent,
          position: new kakao.maps.LatLng(place.y, place.x),
          yAnchor: 1.5,
        });
        overlay.setMap(map);
        overlayRefs.current.push(overlay);

        kakao.maps.event.addListener(marker, "click", () => {
          window.open(place.place_url, "_blank");
        });
        overlayContent.addEventListener("click", () => {
          window.open(place.place_url, "_blank");
        });
      });
    };

    return () => {
      markerRefs.current.forEach((marker) => marker.setMap(null));
      overlayRefs.current.forEach((overlay) => overlay.setMap(null));
    };
  }, [keyword, userPosition]);

  useEffect(() => {
    if (selectedFavorite && mapInstance.current) {
      const kakao = window.kakao;
      const { y, x, place_name, place_url } = selectedFavorite;
      const latLng = new kakao.maps.LatLng(y, x);
      mapInstance.current.setCenter(latLng);

      markerRefs.current.forEach((marker) => marker.setMap(null));
      overlayRefs.current.forEach((overlay) => overlay.setMap(null));
      markerRefs.current = [];
      overlayRefs.current = [];

      const marker = new kakao.maps.Marker({
        position: latLng,
        map: mapInstance.current,
      });
      markerRefs.current.push(marker);

      const overlayContent = document.createElement("div");
      overlayContent.innerHTML = `<div style="background: white; border: 1px solid #ccc; padding: 5px; border-radius: 5px;">${place_name}</div>`;
      overlayContent.style.whiteSpace = "nowrap";

      const overlay = new kakao.maps.CustomOverlay({
        content: overlayContent,
        position: latLng,
        yAnchor: 1.5,
      });
      overlay.setMap(mapInstance.current);
      overlayRefs.current.push(overlay);

      kakao.maps.event.addListener(marker, "click", () => {
        window.open(place_url, "_blank");
      });
      overlayContent.addEventListener("click", () => {
        window.open(place_url, "_blank");
      });
    }
  }, [selectedFavorite]);

  const handleListClick = (park) => {
    const latLng = new kakao.maps.LatLng(park.y, park.x);
    mapInstance.current.setCenter(latLng);
  };

  const handleFavoriteClick = (park) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((item) => item.id === park.id);
      if (isFavorite) {
        return prevFavorites.filter((item) => item.id !== park.id);
      } else {
        return [...prevFavorites, park];
      }
    });
  };

  return (
    <>
      <div className="all">
        <div
          ref={mapRef}
          style={{ width: "70%", height: "700px", marginRight: "20px" }}
        ></div>

        <div style={{ width: "30%", overflowY: "auto", height: "700px" }}>
          <h2>주차장 목록</h2>
          {parks.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {parks.map((park) => (
                <li
                  key={park.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleListClick(park);
                  }}
                >
                  <strong>{park.place_name}</strong>
                  <br />
                  {park.road_address_name || park.address_name}
                  <br />
                  <small>{park.phone || "전화번호 없음"}</small>
                  <button
                    className={`favbtn ${
                      favorites.some((item) => item.id === park.id)
                        ? "remove-favorite"
                        : "add-favorite"
                    }`}
                    onClick={() => handleFavoriteClick(park)}
                  >
                    {favorites.some((item) => item.id === park.id)
                      ? "즐겨찾기 삭제"
                      : "즐겨찾기 추가"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>근처 주차장이 없습니다.</p>
          )}
        </div>
        <button type="button" onClick={handleClick} className="top">
          🔺
        </button>
      </div>
    </>
  );
}

export default MapComponent;
