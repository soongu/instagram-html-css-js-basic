// instagram-clone-frontend/js/lazy-image.js
// F-2: 화면에 들어오는 사진을 부드럽게 "나타나게" 해요.
//      D-4 무한 스크롤에서 썼던 IntersectionObserver 를 다시 써요 —
//      "이 요소가 화면에 보이나?"를 우리가 계산하지 않고 브라우저가 대신 감시해줘요.

// 관찰자(observer) 한 명을 만들어 여러 사진을 함께 감시해요(사진마다 만들지 않아요).
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue; // 아직 화면 밖이면 그대로 둬요
      entry.target.classList.add("is-revealed"); // 보이는 순간 또렷하게(페이드인)
      revealObserver.unobserve(entry.target); // 한 번 나타나면 더는 안 봐요(낭비 방지)
    }
  },
  {
    // 화면에 닿기 200px 전에 미리 켜서, 스크롤이 도착했을 땐 이미 또렷해지도록 해요.
    rootMargin: "200px",
  }
);

// figure 한 채를 감시 목록에 올려요.
// .lazy-photo 는 "흐릿하게 시작" 표시 — JS 가 도는 지금만 붙여요.
// (JS 가 멈춰도 이 클래스가 안 붙으니 사진은 그냥 보여요 — 점진적 향상)
export function revealOnScroll(figure) {
  figure.classList.add("lazy-photo");
  revealObserver.observe(figure);
}
