# 변경 이력

날짜는 작업일 기준입니다. 각 항목은 배포 단위입니다.

## 2026-08-18 — 감사 라운드
- 다차원 감사(커버리지, 연속성, 역-선 정합, 코드 일관성, 용량)에서 확인된 결함 수리.
- Grand Central Madison 접근선 추가. OSM의 LIRR route relation이 전부 Penn Station 기준이라 East Side Access가 빠져 있었음. "Grand Central Branch"(operator: Long Island Rail Road) way 73개를 직접 수집해 본선 색으로 편입.
- Hudson–Bergen Light Rail, Newark Light Rail 렌더 추가(전용 색). 선 없이 떠 있던 역 점 40개가 노선과 정합됨.
- AirTrain Newark(EWR) 추가. AirTrain JFK와 같은 색.
- SIR 역 12개(Tottenville, Great Kills 등)와 PATH Harrison 역 추가.
- Cross Sound Ferry 항로가 New London–Block Island로 잘못 그려져 있던 것을 Orient Point–New London 실항로로 교정.
- Amtrak NEC의 Thames River 교량 구간이 수집 bbox 경계에 걸려 누락되던 것을 margin 확장으로 해결(동쪽 51km 구간 고립 해소).
- 커레이션 역 좌표 4건(Speonk, Gibson, Deer Park, St. James) OSM 좌표로 스냅, 중복 역 점 제거, Belmont Park 고아 점 제거.
- 초기 로드 최적화: 대형 버킷 4개(주요 도로 3, Metro-North)를 지연 빌드로 전환.
- 푸터 저작권 표기를 실데이터 기준으로 갱신, Atlantic Branch 라벨 색 교정, dead code 제거.

## 2026-08-18 — 철도 여객 relation 재구성
- 선로 분류를 근접도 추측에서 OSM route=train relation 193개 기반으로 전면 교체.
- 여객 relation에 속하지 않는 화물선(NY&A, Lower Montauk, Bay Ridge Branch)과 야드 스퍼가 지도에서 사라짐.
- 노선별 색 분리: LIRR Port Jefferson(파랑), Ronkonkoma·Greenport(초록), Port Washington(마젠타), 기타 LIRR(스틸), Metro-North·CTrail(빨강, Hudson 동측), NJ Transit(올리브, 신설), Amtrak(슬레이트, 신설).
- 공유 선로는 우선순위 순서로 dedupe. 공동운행 Port Jervis Line은 NJ Transit 색.
- 신규 방문자 전원에게 발생하던 초기화 순서 크래시(FAVS TDZ) 수정.

## 2026-08-14 — 역·연속성 총정리
- 역 98개를 OSM railway=station 노드에 스냅하고 Metro-North·NJ Transit·Amtrak 역 234개 추가(중복 11개 제거).
- 서비스 트랙 데이터 삭제(Jamaica 부근 꼬임 해소), coarse 선형은 저줌 전용으로 복귀.
- 폐루프 Douglas-Peucker 붕괴로 본선 일부가 사라지던 버그 수정(far-point seed).
- 철도 전 레이어에 최소 화면 폭 보장(1px 미만이 끊김처럼 보이던 문제).

## 2026-08-13 — 철도 대확장·개인화·무봉제 LOD
- NYC Subway 전 노선(route=subway relation, 공식 색)과 역 491개, PATH, NJ Transit·Amtrak, Metro-North Harlem·Hudson 추가.
- 즐겨찾기, 롱프레스 핀, URL 해시 공유, 경로 안내 개선, 한국어 별칭 검색 29종.
- 줌 시 색 점프 제거(해안 셀을 county별 그룹으로 렌더), 최대 줌 1000배.
- 손그림 약도 완전 퇴출: Metro-North, 지하철 7·E, AirTrain, 페리 전부 실데이터 전환.
- 건물 외곽 relation 조립 방식 수정(스파이크 제거), NJ·CT 도로 보강.

## 2026-08-12 — 우선순위 라벨·네비화·광역 정밀
- 라벨 통합 우선순위 시스템: POI 등급 > 역 > 지명 > 건물명 > 상호 순으로 화면 점유.
- GPS 내 위치, OSM 업소 870곳, 캠퍼스 실명 건물, 라벨 전수 감사 37건 정정.
- 다해상도 도로 LOD(체인 병합 후 간략판), viewport culling, 세로 화면 하단 잘림 수정.

## 2026-08-11 — OSM 통합
- 실제 도로·건물·LIRR 선로·해안선 데이터로 전환. 역 클릭 카드, 검색(오타 교정), LOD 티어 도입.

## 2026-08-10 — 최초 제작
- 스키매틱 지도 + 가이드 탭, PWA 배포(GitHub Pages).
