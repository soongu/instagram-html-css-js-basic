// instagram-clone-frontend/js/main.js
// C-1 JavaScript 입문 — 콘솔에서 직접 확인하는 연습장
// 브라우저에서 feed.html 을 열고 DevTools(F12) → Console 탭을 보세요.

// ===== Step 1. console.log 첫 만남 =====
console.log("인스타 클론에 생명을 불어넣자!");
console.log("좋아요", 42, "개");

// ===== Step 2. 변수 — let / const / var =====
let likeCount = 42;     // let: 나중에 값을 바꿀 수 있는 변수
likeCount = 43;         // 재할당 OK
const username = "hong_tutor";  // const: 한 번 정하면 못 바꾸는 값
// username = "kim";    // const 재할당은 에러가 나요 (주석 풀면 확인)
var legacyVar = "옛날 방식";    // var: 예전 문법 (요즘은 거의 안 써요)
console.log(likeCount, username, legacyVar);

// ===== Step 3. 자료형과 typeof =====
let count = 42;            // number  (숫자)
let name = "hong_tutor";  // string  (문자열)
let isPublic = true;      // boolean (참/거짓)
let caption;              // undefined (아직 값을 안 넣음)
let deletedAt = null;     // null    (의도적으로 비어 있음)
console.log(typeof count);     // "number"
console.log(typeof name);      // "string"
console.log(typeof isPublic);  // "boolean"
console.log(typeof caption);   // "undefined"
console.log(typeof deletedAt); // "object" ← 유명한 함정! null인데 object로 나와요

// ===== Step 4. 연산자 ① 산술·비교 =====
let likes = 42;
let newLikes = 8;
console.log(likes + newLikes); // 50  더하기
console.log(likes - 10);       // 32  빼기
console.log(likes * 2);        // 84  곱하기
console.log(likes / 4);        // 10.5 나누기
console.log(likes % 5);        // 2   나머지
console.log(likes > 100);      // false
console.log(likes === 42);     // true   값과 타입이 모두 같은지
console.log(likes !== 50);     // true   다른지
console.log("42" === 42);      // false  문자열 "42" 와 숫자 42 는 다르다

// ===== Step 5. 연산자 ② 논리 =====
let isLoggedIn = true;
let hasPostedToday = false;
console.log(isLoggedIn && hasPostedToday); // false  AND: 둘 다 참이어야 참
console.log(isLoggedIn || hasPostedToday); // true   OR: 하나만 참이어도 참
console.log(!hasPostedToday);              // true   NOT: 반대로 뒤집기
let followers = 1200;
console.log(followers > 1000 && isLoggedIn); // true  팔로워 1000 초과 그리고 로그인 상태

// ===== Step 6. 조건문 — if / else / switch =====
let postLikes = 150;
if (postLikes > 100) {
  console.log("인기 게시물 🔥");
} else if (postLikes > 0) {
  console.log("공감을 받았어요");
} else {
  console.log("아직 좋아요가 없어요");
}

let mediaType = "image";
switch (mediaType) {
  case "image":
    console.log("사진 게시물");
    break;
  case "video":
    console.log("동영상 게시물");
    break;
  default:
    console.log("알 수 없는 형식");
}

// ===== Step 7. 반복문 — for / while / for...of =====
// for: 정해진 횟수만큼 반복
for (let i = 1; i <= 5; i++) {
  console.log(i + "번째 좋아요!");
}

// while: 조건이 참인 동안 반복
let remaining = 3;
while (remaining > 0) {
  console.log("스토리 자동 넘김까지 " + remaining);
  remaining = remaining - 1;
}

// for...of: 문자열을 한 글자씩 꺼내기 (해시태그 분석)
let tag = "#daily";
for (const ch of tag) {
  console.log(ch);
}
