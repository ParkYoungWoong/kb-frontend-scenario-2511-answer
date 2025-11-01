# KB국민은행 바이트디그리 과정 과제

## 중간 과제

2025년 10월 24일까지 제출합니다.

- TanStack Query를 활용하여 데이터를 효율적으로 가져오고 관리하며, 일정 시간 동안 캐싱하여 불필요한 네트워크 요청을 방지합니다.
- Jest를 활용한 단위 테스트 작성을 통해 컴포넌트의 동작을 검증하고 코드의 안정성을 향상합니다.
- 프로젝트 백업 및 협업을 위한 Git & GitHub 형상 관리 및 원격 저장소 업로드를 진행합니다.

## 요구 사항

### 1. 데이터 패칭 및 캐싱 관리

#### 필수 구현

- `/hooks/movies.ts` 파일에서 데이터 패칭 및 캐싱을 관리합니다.
- `/api/movies?title=${searchText}` 주소로 요청하면 영화 목록을 반환합니다.
- 사용자가 입력하는 검색어(`searchText`)에 따라 데이터를 캐싱하도록 고유한 쿼리 키를 지정합니다.
- 검색어가 없는 경우 빈 데이터(`[]`)를 반환합니다.
- 데이터 캐싱 시간을 1시간으로 설정합니다.

#### 선택 구현(가산점)

- 데이터 패칭을 위해 `fetch` 함수 대신 `axios` 라이브러리를 사용합니다.
- 쿼리 실패 시 재시도(`retry`) 횟수를 1번으로 설정합니다.
- 무한 스크롤 기능을 위해 `useInfiniteQuery`를 사용합니다.
- 패칭 데이터의 `Response` 속성이 `False`인 경우, 함께 포함된 `Error` 속성의 값을 에러 메시지로 표시합니다.

### 2. 컴포넌트 단위 테스트 추가

- `npm test` 명령으로 실행하는 모든 단위 테스트 시나리오가 통과해야 합니다.
- `npm run test:coverage` 명령으로 측정하는 모든 파일의 단위 테스트 커버리지가 80% 이상이어야 합니다.
- 아래 테스트 시나리오 대신 주어진 컴포넌트에 맞게 자신만의 테스트 시나리오를 추가해도 좋습니다.

#### `<Button>`

- `/__tests__/components/Button.test.tsx` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - 기본 버튼이 정상적으로 렌더링된다
  - children props이 정상적으로 표시된다
  - color prop이 없을 때 기본 스타일이 적용된다
  - loading 상태일 때 Loader 컴포넌트가 표시된다
  - loading 상태일 때 Loader에 올바른 props가 전달된다
  - loading 상태일 때 children이 숨겨진다
  - loading이 false일 때 children이 표시되고 Loader는 숨겨진다
  - onClick 이벤트 핸들러가 올바르게 동작한다
  - color prop이 올바르게 적용된다

#### `<Header>`

- `/__tests__/components/Header.test.tsx` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - 헤더가 정상적으로 렌더링된다
  - 메뉴 항목들이 정상적으로 렌더링된다
  - 현재 경로가 "/"일 때 Search 메뉴가 활성화된다
  - 현재 경로가 "/movies/tt4520988"일 때 Sample Movie 메뉴가 활성화된다
  - 알 수 없는 경로일 때 모든 메뉴가 비활성화된다

#### `<Headline>`

- `/__tests__/components/Headline.test.tsx` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - Headline 컴포넌트가 정상적으로 렌더링된다
  - 메인 제목이 정상적으로 렌더링된다

#### `<Loader>`

- `/__tests__/components/Loader.test.tsx` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - 기본 컴포넌트가 정상적으로 렌더링된다
  - size props를 사용하지 않으면 기본 크기가 적용된다
  - size props를 사용하면 해당 크기가 적용된다
  - color props를 사용하지 않으면 기본 색상이 적용된다
  - color props를 사용하면 해당 색상이 적용된다
  - loading props가 false일 때 렌더링되지 않는다
  - loading props가 true일 때 렌더링된다

### 3. Git & GitHub 활용

- 모든 코드 변경 사항은 Git & GitHub를 활용하여 관리합니다.
- GitHub 원격 저장소를 공개(Public)로 생성하고 완성한 중간 과제 프로젝트를 업로드(Push)한 후 저장소 주소를 제출합니다.
