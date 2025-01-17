# 주차장 검색 사이트 🚗

이 프로젝트는 **React**와 **Vite**를 사용하여 개발된 주차장 검색 웹 애플리케이션입니다. 사용자는 카카오 지도 API를 통해 키워드로 검색한 위치 주변 주차장을 검색하고, 즐겨찾기에 추가하여 관리할 수 있습니다.

## 주요 기능 🛵

- **키워드, 주소 검색**: 키워드나 주소로 검색하여 검색한 위치 주변 주차장들을 검색할 수 있습니다.
- **주차장 상세 정보**: 검색한 주차장의 이름을 클릭하면 카카오 기반 URL을 띄어서 상세 정보를 볼 수 있습니다. 상세 정보에서 길 찾기, 로드뷰 등 여러 정보를 얻을 수 있습니다.
- **즐겨찾기**: 주차장들을 즐겨찾기에 추가, 제거로 관리할 수 있고, 즐겨찾기에 추가된 주차장을 클릭 시 지동에서 바로 이동하여 위치를 확인할 수 있습니다.
- **최근 검색 위치**: 네브바에 최근 검색 위치라는 버튼이 있는데 이 버튼을 클릭하면 가장 최근에 검색했던 위치로 자동 이동하여 주차장을 검색합니다.
- **카카오맵 API 사용**: 카카오맵 API를 사용하여 만들었습니다.
- **로컬스토리지 저장**: 로컬스토리지에 저장되어 새로고침하거나 나갔다가 다시 들어와도 즐겨찾기 항목은 유지됩니다.

## 기술 스택 🛠

- **프론트엔드**: React (with Hooks)
- **번들러**: Vite
- **스타일링**: CSS Modules
- **API**: [카카오맵](https://map.kakao.com/)

## 배포 사이트 🌐

[주차장 검색 사이트 바로가기](https://searchparkinglot-jhha.netlify.app/)
