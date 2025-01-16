import React, { useEffect, useRef, useState } from "react";
import "./MapComponent.css";

function MapComponent({
  keyword, // 검색어
  favorites, // 즐겨찾기 목록
  setFavorites, // 즐겨찾기 목록 업데이트
  selectedFavorite, // 선택된 즐겨찾기(클릭했을 때 실행)
  userPosition,
}) {
  const mapRef = useRef(null); // 지도 DOM을 참조
  const mapInstance = useRef(null); // 카카오 맵 인스턴스 참조
  const markerRefs = useRef([]); // 마커 참조
  const overlayRefs = useRef([]); // 오버레이 참조
  const [parks, setParks] = useState([]); //  주차장 목록 저장

  // 페이지 상단으로
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const kakao = window.kakao;
    const container = mapRef.current;

    // 지도 초기 설정
    const options = {
      center: userPosition
        ? new kakao.maps.LatLng(userPosition.lat, userPosition.lng)
        : new kakao.maps.LatLng(35.1795543, 129.0756416),
      level: 4,
    };
    const map = new kakao.maps.Map(container, options);
    mapInstance.current = map;

    // 카카오 지도 API의 장소 검색 서비스 객체, 키워드 검색시 필요
    const ps = new kakao.maps.services.Places();

    //키워드로 장소 검색
    ps.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const center = new kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(center);

        // 카테고리 검색 PK6 주차장
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

    //주차장에 마커 추가
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

        // 마커위에 오버레이 글씨 표시
        const overlay = new kakao.maps.CustomOverlay({
          content: overlayContent,
          position: new kakao.maps.LatLng(place.y, place.x),
          yAnchor: 1.5,
        });
        overlay.setMap(map);
        overlayRefs.current.push(overlay);

        // 마커 오버레이 클릭시 카카오에서 제공하는 상세보기 페이지 열기
        kakao.maps.event.addListener(marker, "click", () => {
          window.open(place.place_url, "_blank");
        });
        overlayContent.addEventListener("click", () => {
          window.open(place.place_url, "_blank");
        });
      });
    };

    //다른 행동 실행시 기존에 마커랑 오버레이 제거
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

      // 선택된 즐겨찾기에 마커와 오버레이 추가
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

      // 즐겨찾기에서 이름 클릭시 아까와 같은 링크 열기
      kakao.maps.event.addListener(marker, "click", () => {
        window.open(place_url, "_blank");
      });
      overlayContent.addEventListener("click", () => {
        window.open(place_url, "_blank");
      });
    }
  }, [selectedFavorite]);

  // 주차장 목록 클릭 시 해당 위치로 지도 이동
  const handleListClick = (park) => {
    const latLng = new kakao.maps.LatLng(park.y, park.x);
    mapInstance.current.setCenter(latLng);
  };

  // 주차장 즐겨찾기 추가/제거 함수
  const handleFavoriteClick = (park) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((item) => item.id === park.id);
      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = prevFavorites.filter((item) => item.id !== park.id);
      } else {
        updatedFavorites = [...prevFavorites, park];
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
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
