// instagram-clone-frontend/js/counter.js
// C-1 마무리 실습 — 좋아요 카운터
// 변수 + 연산자 + 조건문 + 반복문 + console 을 한자리에 모았어요.

const POPULAR_THRESHOLD = 100;  // 이 숫자를 넘으면 "인기 게시물"

let likeCount = 96;             // 지금 좋아요 수
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
