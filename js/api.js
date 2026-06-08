// instagram-clone-frontend/js/api.js
// D-4: 서버와 데이터를 주고받는 fetch 래퍼.
//      지난 시간엔 게시물을 받아 오기(GET)만 했는데,
//      이제 페이지 단위로 받고(무한 스크롤), 댓글을 저장(POST)해요.

const BASE_URL = "http://localhost:3001";

// 상태 코드(숫자)를 사람이 읽을 수 있는 한 줄 메시지로 바꿔요.
// 200번대(성공)가 아닐 때, 화면에 보여줄 말을 골라요.
function describeStatus(status) {
  if (status >= 500) return "서버에 문제가 생겼어요. 잠시 후 다시 시도해 주세요.";
  if (status === 404) return "찾는 데이터가 없어요.";
  if (status >= 400) return "요청에 문제가 있어요.";
  return `알 수 없는 오류예요 (${status}).`;
}

// 게시물을 "한 페이지씩" 가져와요. (무한 스크롤이 페이지 번호를 하나씩 올려 불러요)
// json-server 1.0 은 ?_page=2&_per_page=3 으로 묻고,
// 배열이 아니라 { data: [...], next, last, ... } 객체로 답해요.
export async function fetchPosts(page = 1, perPage = 3) {
  const url = `${BASE_URL}/posts?_page=${page}&_per_page=${perPage}`;
  // AbortSignal.timeout: 8초 안에 응답이 안 오면 요청을 스스로 끊어요(무한 대기 방지).
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) {
    // 200번대가 아니면(404·500 등) 에러를 위로 던져요. 부르는 쪽이 토스트로 알려요.
    throw new Error(describeStatus(response.status));
  }
  return await response.json(); // { data, next, last, pages, items, ... }
}

// 댓글 한 줄을 서버에 "저장"해요. (REST 4동사 중 POST — 새 데이터 생성)
// GET 과 달리 보낼 데이터를 body 에 담고, 형식이 JSON 이라고 헤더로 알려줘요.
export async function createComment(postId, text) {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: "POST",                                  // 1) 생성이니까 POST
    headers: { "Content-Type": "application/json" }, // 2) "JSON 보낼게요" 라고 알림
    body: JSON.stringify({ postId, username: "soongu_hong", text }), // 3) 객체 → JSON 문자열
  });
  if (!response.ok) {
    throw new Error(describeStatus(response.status));
  }
  return await response.json(); // 서버가 id 를 붙여 돌려줘요 (201 Created)
}
