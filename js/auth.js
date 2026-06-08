// instagram-clone-frontend/js/auth.js
// D-5: 로그인한 사람이 누구인지 "브라우저에 기억"시켜요.
//      localStorage 에 로그인 정보(객체)를 저장해 뒀다가,
//      페이지를 새로 열어도, 새로고침해도, 그 기억이 남아 있어요.

// localStorage 에 넣을 때 쓸 "서랍 이름"(key). 하나로 정해 두고 재사용해요.
const AUTH_KEY = "auth";

// 로그인 정보를 저장해요.
// localStorage 는 "문자열"만 담을 수 있어서, 객체를 JSON 문자열로 바꿔(stringify) 넣어요.
export function saveAuth(username) {
  const auth = {
    username,
    // 진짜 토큰은 로그인에 성공하면 서버가 발급해 줘요. 지금은 그 흉내만 내요.
    token: `fake-token-${username}-${Date.now()}`,
    loginAt: new Date().toISOString(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth)); // 객체 → 문자열 → 저장
  return auth;
}

// 저장된 로그인 정보를 꺼내 "객체"로 돌려줘요. 저장된 게 없으면 null.
// 꺼낸 값은 문자열이라, JSON.parse 로 다시 객체로 풀어요.
export function getAuth() {
  const raw = localStorage.getItem(AUTH_KEY); // 문자열 또는 null
  if (!raw) return null;                       // 로그인한 적 없으면 null
  return JSON.parse(raw);                       // 문자열 → 객체
}

// 로그인한 사용자 이름만 꺼내요. 없으면 null.
export function getCurrentUser() {
  const auth = getAuth();
  return auth ? auth.username : null;
}

// 서버 요청에 실어 보낼 토큰을 꺼내요. 없으면 null.
export function getToken() {
  const auth = getAuth();
  return auth ? auth.token : null;
}

// 로그아웃 — 저장된 로그인 정보를 지워요.
export function clearAuth() {
  localStorage.removeItem(AUTH_KEY);
}

// ===== 로그인 폼 처리 (index.html 에서만 동작) =====
// auth.js 는 feed 화면에서도 import 되니까, 로그인 폼이 없는 페이지에선
// 아래 코드가 그냥 건너뛰어져요. (querySelector 가 null 이면 if 가 막아요)
const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 폼 기본 동작(서버로 전송 + 새로고침)을 멈춰요
    const username = loginForm.querySelector("#username").value.trim();
    if (!username) return;  // 빈 이름이면 아무것도 안 해요
    saveAuth(username);      // 로그인 정보를 브라우저에 저장
    location.href = "feed.html"; // 저장했으니 피드 화면으로 이동
  });
}
