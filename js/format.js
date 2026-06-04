// instagram-clone-frontend/js/format.js
// C-5: 게시물을 화면에 보여줄 "문자열"로 바꾸는 함수만 모아둔 파일.
// 데이터(data.js)와 표현(format.js)을 따로 두면, 나중에 찾기 쉬워요.

// 게시물 하나를 카드 한 줄 문자열로 바꿔요.
// 템플릿 리터럴(백틱) + 옵셔널 체이닝(?.) + Nullish 병합(??) 을 한 번에 써요.
export function formatCard(post) {
  const name = post.author?.name ?? "익명"; // author 없으면 "익명"
  const place = post.location ?? "어딘가"; // location 없으면 "어딘가"
  const badge = post.author?.verified ? " ✔" : ""; // 인증 계정만 ✔
  return `${name}${badge} — ${post.caption} (좋아요 ${post.likeCount}개) @${place}`;
}

// 좋아요 수만 따로 문자열로. 0 도 멀쩡한 값이라 ?? 로 null/undefined 만 걸러요.
export function formatCount(likeCount) {
  const n = likeCount ?? 0;
  return `좋아요 ${n}개`;
}
