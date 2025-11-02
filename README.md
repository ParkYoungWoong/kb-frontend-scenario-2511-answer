# KB국민은행 바이트디그리 과정 최종 과제

![과제 프로젝트 완성 예시](./public/movie-app.jpg)

## 요구사항

아래의 단위 테스트, 실시간 오류 모니터링, Git & GitHub 활용, Vercel 배포 요구사항을 충족시켜야 합니다.
최종으로 완성된 과제 프로젝트의 GitHub 원격 저장소와 Vercel 배포 주소를 제출합니다.
2025년 11월 21일까지 제출해야 합니다.

### 1. 단위 테스트

- `npm test` 명령으로 실행하는 모든 단위 테스트 시나리오가 통과해야 합니다.
- `npm run test:coverage` 명령으로 측정하는 모든 파일의 단위 테스트 커버리지가 80% 이상이어야 합니다.
- 아래 테스트 시나리오 대신 주어진 컴포넌트에 맞게 자신만의 테스트 시나리오를 추가해도 좋습니다.

#### MovieItem

- `/__tests__/components/MovieItem.test.tsx` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - 영화 아이템이 정상적으로 렌더링된다
  - 영화 제목과 연도가 올바르게 표시된다
  - 영화 포스터 이미지가 올바른 속성으로 렌더링된다
  - 영화 상세 페이지로 이동하는 링크가 올바른 href를 가진다
  - 포스터 보기 버튼을 클릭하면 포스터 페이지로 이동한다

#### MovieList

- `/__tests__/components/MovieList.test.tsx` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - 영화 목록이 정상적으로 렌더링된다
  - 영화 목록이 비어있고 메시지가 있을 때 메시지가 표시된다
  - 영화 목록이 있을 때는 메시지가 표시되지 않는다
  - 영화 목록이 undefined일 때 메시지가 표시된다

#### SearchBar

- `/__tests__/components/SearchBar.test.tsx` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - 검색 바가 정상적으로 렌더링된다
  - 입력 필드에 텍스트를 입력하면 setInputText가 호출된다
  - Reset 버튼을 클릭하면 resetMovies가 호출된다
  - form 제출 시 setSearchText가 호출된다
  - isFetching이 true일 때 Search 버튼에 로딩 상태가 표시된다
  - Search 버튼은 submit 타입이다

#### Movies API

- `/api/movies/route.ts` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - title 파라미터로 OMDB API를 호출하고 응답을 반환한다
  - API_KEY가 환경변수에서 올바르게 사용된다

#### Movies Hooks

- `/__tests__/hooks/movies.test.tsx` 파일에서 테스트를 작성합니다.
- 다음 시나리오들을 테스트합니다.
  - useMoviesStore
    - setInputText가 inputText를 업데이트한다
    - setSearchText가 searchText를 업데이트한다
    - setMessage가 message를 업데이트한다
    - resetMovies가 모든 상태를 초기화한다
  - useMovies
    - searchText가 비어있을 때 빈 배열을 반환한다
    - searchText가 있을 때 API를 호출하고 영화 목록을 반환한다
    - API가 False Response를 반환할 때 에러를 던진다
    - 공백만 있는 searchText는 빈 배열을 반환한다
    - isFetching이 로딩 상태를 올바르게 반영한다

### 2. 실시간 오류 모니터링 도구

Sentry를 활용하여 실시간 오류 모니터링을 구현합니다.

- [Sentry](https://sentry.io/) 서비스에 가입(무료)합니다.
- 과제 프로젝트에 [Sentry SDK를 설치](https://docs.sentry.io/platforms/javascript/guides/nextjs/)합니다.
- Sentry 프로젝트 이름에 자신의 영어 이름을 포함합니다.(예: `parkyoungwoong-movie-app`)
- 샘플 에러를 발생시켜 Sentry에 전송합니다.
- Sentry Dashboard / Issues 페이지에서 확인한 샘플 에러를 스크린샷으로 촬영합니다.
- 스크린샷을 과제 프로젝트의 `public` 폴더에 첨부합니다.

![Sentry 예제 에러](./public/sentry-error-sample.jpg)

### 3. Git & GitHub 활용

- 모든 코드 변경 사항은 Git & GitHub를 활용하여 관리합니다.
- GitHub 원격 저장소를 공개(Public)로 생성하고 완성한 최종 과제 프로젝트를 업로드(Push)한 후 저장소 주소를 제출합니다.

### 4. 배포

Vercel 혹은 AWS 등을 활용해 프로젝트를 배포합니다.

- GitHub 원격 저장소에 업로드한 과제 프로젝트를 원하는 서비스를 통해 배포합니다.
- 환경변수를 지정해 실제로 영화를 검색할 수 있어야 합니다.
- 확인 가능하도록 배포된 과제 프로젝트의 URL 주소를 제출합니다.
