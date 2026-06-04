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


// ============================================================
// C-3 함수 어드밴스 — 스코프 · 클로저 · 콜백
// ============================================================

// ===== Step 1. 스코프 ① 전역 스코프 vs 함수 스코프 =====
// 전역(global): 함수 밖, 코드 어디서나 보이는 변수
// 함수 스코프: 함수 { } 안에서 만든 변수는 그 함수 안에서만 보임
const appName = "인스타 클론";   // 전역 변수

function showAppName() {
  const greeting = "환영합니다";   // 함수 안에서만 사는 변수
  console.log(appName + "에 " + greeting);  // 전역 appName 은 안에서도 보임
}
showAppName();           // 인스타 클론에 환영합니다
console.log(appName);    // 인스타 클론 (전역은 함수 밖에서도 보임)
// console.log(greeting);  // ReferenceError! 함수 안 변수는 밖에서 안 보여요

// ===== Step 2. 스코프 ② 블록 스코프 + 스코프 체인 =====
// let / const 는 { } 블록 안에서만 살아있어요 (블록 스코프)
let totalLikes = 0;
if (totalLikes === 0) {
  const message = "아직 좋아요가 없어요";  // if 블록 안에서만 보임
  console.log(message);
}
// console.log(message);  // ReferenceError! if 블록 밖에선 안 보여요

// for 의 i 도 블록 스코프 — 루프가 끝나면 사라져요
for (let i = 1; i <= 3; i++) {
  console.log(i + "번째 게시물 확인");
}
// console.log(i);  // ReferenceError! for 밖에선 i 가 없어요

// 스코프 체인: 안쪽 함수는 자기에게 없는 변수를 바깥에서 찾아 올라가요
const outerTag = "#daily";
function printTag() {
  console.log(outerTag);   // 내 안에 없으면 바깥 스코프에서 찾음
}
printTag();  // #daily

// ===== Step 3. 클로저 ① 함수가 자신의 변수를 기억한다 =====
// 함수 안에서 함수를 만들어 돌려주면, 안쪽 함수는
// 바깥 함수의 변수를 계속 "기억"해요. 이게 클로저(closure).
function makeCounter() {
  let count = 0;            // 바깥 함수의 변수
  return function () {       // 안쪽 함수를 돌려줌
    count = count + 1;       // 바깥 count 를 계속 기억하고 더함
    return count;
  };
}
const counter = makeCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3  ← count 가 사라지지 않고 기억돼요!

// ===== Step 4. 클로저 ② 활용 — 좋아요 토글 상태 숨기기 =====
// 좋아요 상태(liked)를 함수 안에 숨겨두고, 부를 때마다 켜짐/꺼짐을 뒤집어요.
// C-2 의 toggleLike 는 상태를 밖에서 들고 다녔지만, 이번엔 함수가 직접 기억해요.
function makeLikeToggle() {
  let liked = false;        // 이 상태는 함수 안에 숨어 있어요
  return function () {
    liked = !liked;         // 누를 때마다 반대로 뒤집기
    return liked;
  };
}
function showLike(state) {
  if (state) {
    console.log("켜짐 ❤️");
  } else {
    console.log("꺼짐 🤍");
  }
}
const toggle = makeLikeToggle();
showLike(toggle());  // 켜짐 ❤️
showLike(toggle());  // 꺼짐 🤍
showLike(toggle());  // 켜짐 ❤️
// liked 변수는 함수 밖에서 직접 못 봐요 — 클로저가 안전하게 숨겨줘요

// ===== Step 5. 콜백 ① 함수를 값으로 건네주기 =====
// 함수도 값이라서, 다른 함수에 인자로 넘길 수 있어요.
// 넘겨받아 안에서 부르는 함수를 콜백(callback)이라고 해요.
function sayHi() {
  console.log("안녕하세요!");
}
function runTwice(callback) {   // callback 자리에 함수를 받음
  callback();                  // 받은 함수를 부름
  callback();                  // 한 번 더
}
runTwice(sayHi);  // 안녕하세요! (두 번)

// 이름 없는 화살표 함수를 그 자리에서 바로 넘겨도 돼요
runTwice(() => console.log("좋아요 눌렀어요"));

// ===== Step 6. 콜백 ② 배열을 돌며 콜백 실행하기 =====
// for 루프로 배열을 돌면서, 각 요소마다 콜백을 한 번씩 불러요.
// (배열 전용 메서드는 다음 시간에 — 지금은 직접 만들어요)
function forEachItem(items, callback) {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);   // 요소 하나를 콜백에 넘김
  }
}
const tags = ["#여행", "#맛집", "#일상"];
forEachItem(tags, (tag) => {
  console.log("태그: " + tag);
});
// 콜백만 바꾸면 같은 순회로 다른 일을 할 수 있어요
forEachItem(tags, (tag) => {
  console.log(tag + " 의 길이: " + tag.length);
});

// ===== Step 7. 피드 필터링 함수 — filterPosts (마무리 실습) =====
// 게시물을 카테고리별로 걸러내요. 각 게시물은 객체로 표현하는데,
// 객체는 다음 시간에 제대로 배워요. 지금은 "이렇게 생겼다"만 미리보기!
// post.category 처럼 점(.)으로 객체 안의 값을 꺼내요.
const posts = [
  { caption: "제주 여행 다녀왔어요", category: "travel" },
  { caption: "오늘의 맛집 발견", category: "food" },
  { caption: "평범한 일상", category: "daily" },
  { caption: "발리 서핑 도전", category: "travel" },
  { caption: "집밥 한 끼", category: "food" }
];

// posts 중 category 가 일치하는 것만 골라, 매칭된 게시물마다 콜백 실행
function filterPosts(items, category, onMatch) {
  let matched = 0;                       // 함수 스코프 변수 (몇 개 찾았나)
  for (let i = 0; i < items.length; i++) {
    const post = items[i];
    if (post.category === category) {    // 카테고리가 같은가?
      matched = matched + 1;
      onMatch(post);                     // 일치한 게시물을 콜백에 넘김
    }
  }
  return matched;                        // 찾은 개수를 돌려줌
}

// "여행 게시물만 보여줘" — 콜백으로 출력 방식을 정해요
const travelCount = filterPosts(posts, "travel", (post) => {
  console.log("✈️ " + post.caption);
});
console.log("여행 게시물 " + travelCount + "개");

// 같은 함수, 콜백만 바꿔서 "맛집"을 다르게 출력해요
filterPosts(posts, "food", (post) => {
  console.log("🍜 " + post.caption + " (맛집)");
});
