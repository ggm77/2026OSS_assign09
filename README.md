# Assignment 09 - Fetch API + MockAPI CRUD Service

## Deployment

- GitHub URL: https://github.com/2026-2-OSS/assign09-c01-22300378
- Vercel URL: https://hw9-ggm77.vercel.app/
- MockAPI Endpoint: https://6adea7274e88f1bba4a53c73.mockapi.io/product

| 페이지 / 파일 | 설명 |
|---|---|
| `index.html` | `crud.html`로 이동하는 링크 |
| `crud.html` | 상품 관리 CRUD 화면 (Form, 검색, 목록) |
| `js/crud.js` | fetch()로 MockAPI에 GET / POST / PUT / DELETE 요청 |
| `css/style.css` | 페이지 스타일 |

## Service

### 주제

상품 관리

### 데이터 Field

| Field | 설명 |
|---|---|
| id | MockAPI가 자동으로 발급하는 상품 번호 |
| createdAt | 등록 일시 (등록할 때 `new Date().toISOString()`으로 저장) |
| name | 상품명 |
| description | 상품 설명 |
| price | 가격 (MockAPI에 문자열로 저장됨, 예: `"551.25"`) |

### CRUD 기능

- **Read (GET)**: 페이지가 열리면 `loadProducts()`가 `fetch(API_URL)`로 목록을 가져와 `products`에 저장하고 `renderProducts()`로 화면에 출력한다.
- **Create (POST)**: 입력값을 검사한 뒤 `method: "POST"`와 `JSON.stringify()`한 body로 서버에 추가하고, 목록을 다시 불러온다.
- **Update (PUT)**: [수정] 버튼을 누르면 해당 상품 값을 Form에 채우고 `editingId`에 id를 저장한다. 저장할 때 `${API_URL}/${editingId}`로 `PUT` 요청을 보내고 목록을 다시 불러온다.
- **Delete (DELETE)**: [삭제] 버튼을 누르면 `confirm()`으로 확인한 뒤 `${API_URL}/${id}`로 `DELETE` 요청을 보내고 목록을 다시 불러온다.
- **Search**: 검색창에 입력할 때마다 `products.filter()`로 상품명에 검색어가 포함된 상품만 출력한다. (대소문자 구분 없음)
- **Error**: 요청이 실패하면 `catch`에서 `#message`에 오류 메시지를 표시한다.

### Validation

Create와 Update 모두 `validateProduct()`를 거친다.

- 상품명 필수 입력, 30자 이하
- 설명 필수 입력
- 가격 필수 입력, 0보다 큰 숫자

Update는 `validateUpdate()`를 추가로 거친다.

- 수정할 상품이 목록에 존재하는지 확인
- 기존 값과 비교해 변경된 내용이 없으면 수정하지 않음

## Key Learning

1. `fetch()`는 Promise를 반환하므로 `async/await`로 응답을 기다리고, `response.ok`로 성공 여부를 확인한 뒤 `response.json()`으로 JSON을 JavaScript 객체로 바꿔야 한다.
2. REST API는 같은 URL에 대해 Method(GET / POST / PUT / DELETE)로 동작을 구분하고, 특정 데이터는 `/product/{id}`처럼 URL에 id를 붙여 지정한다.
3. 데이터를 서버로 보낼 때는 `JSON.stringify()`로 문자열로 바꾸고 `Content-Type: application/json` 헤더를 함께 보내야 한다. 데이터가 서버에 저장되므로 새로고침해도 유지된다.

## AI / Search Usage

- Tool: Claude (Claude Code)
- 본인 추정 AI 코드 기여율: **약 10%**
- 핵심 기능 코드는 직접 작성했고, Claude는 버그 찾기, 리드미 작성등을 도왔다.

| 사용 목적 | 실제 적용 | 직접 수정한 내용 | 배운 점 |
|---|---|---|---|
| 각종 버그 수정 | 검색 필터링시 제대로 목록이 뜨지 않던 문제 해결, POST 요청이 날아가지 않던 문제 해결 | 없음 | 검색은 서버에 다시 요청하지 않고 GET으로 받아 둔 `products` 배열을 `filter()`해서 보여줄 수 있다. |
| README 작성 | README 구성 및 내용, Reflection, AI 사용 기록 작성 | Problem & Solution과 Reflection의 일부 항목을 직접 삭제함 | 이전 과제 README의 Reflection 형식(새롭게 알게 된 점, 궁금한 점)에 맞춰 정리했다. |

## Problem & Solution

| 문제 | 해결 |
|---|---|
| 등록 버튼을 누르면 페이지가 새로고침되고 등록되지 않음 | `submit` 버튼의 기본 동작 때문이었다. click 이벤트에서 `e.preventDefault()`를 호출했다. |
| MockAPI의 `price`가 숫자가 아니라 문자열(`"551.25"`)로 저장되어 있음 | 서버 데이터 형식에 맞춰 문자열로 보내고, 숫자 검사는 `isNaN()`과 `Number()`로 했다. |
| 변경 여부를 비교할 때 기존 값이 필요함 | GET으로 받아온 `products` 배열에서 `find()`로 수정 중인 상품을 찾아 비교했다. |

## Reflection

- 지난 과제에서 추가와 수정 함수를 나누면 어떻게 달라질지 궁금했는데, 이번에 `addProduct()`와 `updateProduct()`로 나눠 보니 요청 Method와 URL이 달라서 나누는 편이 더 읽기 쉬웠다. 다만 입력창을 비우는 코드가 여러 함수에 반복되는 점은 아쉽다.
- `fetch()`는 404나 500 응답이 와도 에러를 던지지 않아서 `response.ok`를 직접 확인해야 한다는 점이 새로웠다.
- 궁금한 점: MockAPI처럼 공개된 API는 누구나 데이터를 바꿀 수 있는데, 실제 서비스에서는 요청을 보낸 사람이 누구인지 어떻게 구분하고 막는지 궁금하다.
