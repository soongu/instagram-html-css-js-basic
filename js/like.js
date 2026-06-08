// instagram-clone-frontend/js/like.js
// D-1: 좋아요 토글 — classList.toggle 로 하트를 켜고, textContent 로 숫자 갱신

// index 번째 게시물의 좋아요를 켜고 끕니다. 콘솔에서 toggleLike(0) 처럼 부르세요.
export function toggleLike(index) {
  const article = document.querySelectorAll("article")[index];
  if (!article) {
    console.log("그런 게시물이 없어요:", index);
    return;
  }

  // 1) 하트 버튼의 'is-active' 클래스를 켜고 끄기 (CSS 가 빨간 하트로 보여줘요)
  //    classList.toggle 은 켜졌으면 true, 꺼졌으면 false 를 돌려줘요.
  const likeBtn = article.querySelector(".icon-btn-like");
  const liked = likeBtn.classList.toggle("is-active");

  //    빈 하트(#ico-heart) ↔ 꽉 찬 하트(#ico-heart-fill) 로 아이콘을 갈아끼워요.
  //    is-active 의 color:red 와 합쳐져, 켜지면 '꽉 찬 빨간 하트' 로 보여요.
  const heartUse = likeBtn.querySelector("use");
  heartUse.setAttribute(
    "href",
    liked ? "assets/icons.svg#ico-heart-fill" : "assets/icons.svg#ico-heart"
  );

  // 2) 좋아요 숫자 갱신 — <strong> 안의 글자만 textContent 로 바꿔요
  const strong = article.querySelector(".post-likes strong");
  let count = Number(strong.textContent.replaceAll(",", "")); // "1,240" → 1240
  count = liked ? count + 1 : count - 1;
  strong.textContent = count.toLocaleString();                // 1241 → "1,241"

  console.log(liked ? "좋아요 ❤️" : "좋아요 취소 🤍", "→", strong.textContent);
  return liked;
}
