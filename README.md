# SBU 정착 지도 · NYC & Long Island

Stony Brook University 유학 생활 정착을 위한 개인 지도/네비게이션 PWA입니다. 관광용이 아니라 통학, 장보기, 교통, 생활 서비스 중심의 학생 생활권 지도입니다.

- 배포: https://junsudo.github.io/sbu-map/
- iPhone 설치: Safari에서 열고 공유 → Add to Home Screen. Service worker가 network-first로 동작하므로 배포 후 앱을 다시 열면 자동 갱신됩니다.

## 기획

목표는 Google Maps를 대체하는 것이 아니라, 정착 초기에 필요한 정보만 우선순위에 따라 보여주는 지도입니다. 설계 원칙은 다음과 같습니다.

1. 손그림 약도를 쓰지 않는다. 해안선, 도로, 건물, 철도, 항로 전부 실제 좌표 데이터로 그린다.
2. LOD(level of detail) 기반으로 동작한다. 축소하면 간선과 거점만, 확대하면 건물 내부 형상과 상호까지 나타난다.
3. 라벨은 중요도 순으로 자리를 차지한다. 역이 식당에 밀리지 않도록 정적 우선순위와 화면 점유 그리드로 declutter한다.
4. 정확성이 우선이다. 업소는 공식 로케이터나 OSM으로 교차 검증한 것만 싣는다.
5. 명칭은 공식 명칭을 쓴다. 임의의 한국어 조어를 만들지 않는다.

## 기능

- 실측 지오메트리: 건물 약 69,000동, 전 등급 도로망, US Census 500k 해안선(county 색 구분)
- 철도: OSM 여객 route relation 기반. LIRR 전 지선(지선별 색), Grand Central Madison 접근선, Metro-North(Harlem·Hudson·New Haven·지선), NJ Transit 전 노선, Amtrak(Hell Gate·Empire 포함), NYC Subway 전 노선(공식 색)과 역 약 500개, PATH, SIR, Hudson–Bergen Light Rail, Newark Light Rail, AirTrain JFK·EWR
- 페리: Port Jefferson–Bridgeport, Cross Sound(Orient Point–New London) 실항로
- 역 350여 개 클릭 카드(지선, 환승 안내), 캠퍼스 실명 건물 187동, OSM 업소 870곳(9개 카테고리)
- 검색: 부분 일치, 오타 교정(Damerau-Levenshtein), 한국어 별칭, 카테고리 근처 검색
- GPS 내 위치, 즐겨찾기, 롱프레스 핀, URL 해시 공유, 다크 모드
- 가이드 탭: 통학(LIRR Port Jefferson Branch), 요금, 한인 상권, 생활 서비스 정리

## 구조

코드는 `index.html`(약 6.5MB)에 있고, 전역 건물·주거도로 데이터는 분리 파일(`d_bld1.js`, `d_bld2.js`, `d_str.js`, 합계 약 118MB)에 있습니다. 전부 같은 origin의 정적 파일이라 service worker가 캐시하면 오프라인으로 동작합니다. 건물은 맵 전체에서 1,314,808동(Geofabrik NY·NJ·CT PBF에서 osmium으로 추출, 면적 상위 셀당 75동, 생활권·캠퍼스는 전량)입니다.

- 투영: equirectangular. 경도 -74.30~-71.78, 위도 40.50~41.34, `SX=W/((LON1-LON0)*cos(40.92°))`
- 렌더: SVG 단일 `<g>` 뷰 변환. 레이어는 24×12(건물 48×24) 공간 셀로 나눠 viewport culling
- 성능: 팬은 변환만 갱신하는 fast-path, 줌 변경 시에만 라벨/굵기 재계산(40ms 스로틀+trailing), 고줌 레이어는 requestIdleCallback으로 지연 빌드
- 데이터 파이프라인(오프라인, Python): Overpass 수집 → Douglas-Peucker 간략화(폐루프는 far-point seed 필수) → 체인 병합 → 좌표 4자리 반올림 → JS 상수로 병합
- 철도 분류: route=train relation 이름으로 버킷 매핑, way id 전역 dedupe(공유 선로는 상위 노선 색). 여객 relation에 없는 화물선·야드는 자동 배제

## 데이터 출처

- 도로·건물·철도·지하철·항로·업소: © OpenStreetMap contributors (ODbL)
- 해안선·county 경계: US Census Bureau (gz_2010_us_050_00_500k)
- 요금·운행 정보: 2026-08 기준 수기 확인

## 개발 메모

`index.html`은 `head(메타·manifest) + 본문(코드·데이터) + tail(service worker 등록)` 구조로 재생성합니다. 데이터 상수는 한 줄씩이므로 `^const NAME=` 정규식으로 추출·교체합니다. 상세 변경 이력은 [CHANGELOG.md](CHANGELOG.md)에 있습니다.
