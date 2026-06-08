// instagram-clone-frontend/js/api.js
// D-3: 서버와 데이터를 주고받는 fetch 래퍼.
//      json-server(포트 3001)에서 게시물 목록을 가져와요.

const BASE_URL = "http://localhost:3001";

// 게시물 목록을 서버에서 가져와요.
// async/await 로 "응답을 기다렸다가" 결과를 돌려줘요. (C-7 에서 배운 그 문법이에요)
export async function fetchPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`); // 1) 서버에 GET 요청을 보내요
    if (!response.ok) {
      // 2) 상태 코드가 200~299 가 아니면(404·500 등) 실패로 봐요
      throw new Error(`서버 응답 오류: ${response.status}`);
    }
    const posts = await response.json(); // 3) 응답 본문을 JSON 으로 풀어요
    return posts; // 4) 게시물 배열을 돌려줘요
  } catch (error) {
    // 5) 서버가 꺼져 있거나 네트워크가 끊기면 여기로 와요
    console.error("게시물을 불러오지 못했어요:", error.message);
    return []; // 빈 배열을 돌려 화면이 깨지지 않게 해요
  }
}
