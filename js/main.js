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

// ===== Step 8. 좋아요 카운터 (마무리 실습) =====
// 변수 + 연산자 + 조건문 + 반복문 + console 을 한자리에 모았어요.
// Step 2에서 만든 likeCount 변수를 여기서 다시 활용합니다.
const POPULAR_THRESHOLD = 100;  // 이 숫자를 넘으면 "인기 게시물"
likeCount = 96;                 // 지금 좋아요 수로 다시 설정
console.log("시작 좋아요: " + likeCount);

// 5명이 차례로 좋아요를 누른다
for (let i = 1; i <= 5; i++) {
  likeCount = likeCount + 1;
  console.log(i + "번째 사용자가 좋아요! → 현재 " + likeCount);
}

// 인기 게시물인지 판정
if (likeCount >= POPULAR_THRESHOLD) {
  console.log("🔥 인기 게시물 달성! (" + likeCount + "개)");
} else {
  console.log("좋아요 " + likeCount + "개");
}


// ============================================================
// C-2 함수 기초 — 반복 코드를 이름 붙여 재사용하기
// ============================================================

// ===== Step 1. 함수 선언식 — 좋아요 안내를 한 번만 정의 =====
// C-1에서는 게시물마다 console.log 를 복사했어요.
// 이제 한 번만 만들고, 이름으로 불러 씁니다.
function announceLike(count) {
  console.log("좋아요 " + count + "개입니다");
}
announceLike(42);   // 좋아요 42개입니다
announceLike(8);    // 좋아요 8개입니다
announceLike(150);  // 좋아요 150개입니다

// ===== Step 2. 함수 표현식 vs 화살표 함수 =====
// 같은 함수를 세 가지 방법으로 만들 수 있어요.
const announceLikeExpr = function (count) {  // 함수 표현식: 변수에 함수를 담기
  console.log("좋아요 " + count + "개입니다");
};
const announceLikeArrow = (count) => {       // 화살표 함수: function 글자를 => 로
  console.log("좋아요 " + count + "개입니다");
};
announceLikeExpr(42);
announceLikeArrow(42);

// 한 줄짜리 화살표 함수는 중괄호와 return 을 생략할 수 있어요.
const doubleLikes = (n) => n * 2;
console.log(doubleLikes(21));  // 42

// ===== Step 3. 매개변수와 반환값(return) — 숫자를 보기 좋게 =====
// 입력(count)을 받아 결과를 return 으로 돌려줍니다.
function formatLikeCount(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "천";  // 1240 → "1.2천"
  }
  return count + "개";
}
console.log(formatLikeCount(8));     // 8개
console.log(formatLikeCount(1240));  // 1.2천

// ===== Step 4. 매개변수 기본값 — 값을 안 넘기면 기본값 사용 =====
function greet(name = "게스트") {
  console.log(name + "님, 환영합니다");
}
greet("hong_tutor");  // hong_tutor님, 환영합니다
greet();              // 게스트님, 환영합니다 (값을 안 넘기면 기본값)

// ===== Step 5. rest parameter(...) — 개수가 정해지지 않은 인자 =====
// 인자를 몇 개를 넘기든 postIds 라는 하나의 묶음으로 받아요.
function likeMultiplePosts(...postIds) {
  console.log(postIds.length + "개 게시물에 좋아요를 눌렀어요");
  for (const id of postIds) {
    console.log("게시물 " + id + " 좋아요 완료");
  }
}
likeMultiplePosts(1, 2, 3);  // 3개 게시물에...
likeMultiplePosts(7);        // 1개 게시물에...

// ===== Step 6. 재사용 유틸 함수 모음 (마무리 실습) =====
// 좋아요 토글 + 숫자 포맷 함수를 한 묶음으로 정리했어요.
function toggleLike(liked) {
  return !liked;  // 눌렀으면 취소, 안 눌렀으면 누름
}

let myLiked = false;
myLiked = toggleLike(myLiked);  // true
console.log("좋아요 상태: " + myLiked + " / 표시: " + formatLikeCount(1241));
myLiked = toggleLike(myLiked);  // false
console.log("좋아요 상태: " + myLiked);
