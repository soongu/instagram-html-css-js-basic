// instagram-clone-frontend/js/infinite-scroll.js
// D-4: 무한 스크롤 — 화면 맨 아래 "감시병(sentinel)" 요소가 보이면 다음 페이지를 불러와요.
//      스크롤 위치를 직접 계산하지 않고, IntersectionObserver 가 "보이는지"를 대신 감시해요.

// sentinel: 감시할 요소(보통 목록 맨 끝의 빈 div)
// onReach: 감시병이 화면에 보일 때 실행할 함수(다음 페이지 불러오기)
export function setupInfiniteScroll(sentinel, onReach) {
  let loading = false; // 이미 불러오는 중이면 또 부르지 않게 막는 빗장

  const observer = new IntersectionObserver(async (entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return; // 아직 화면 밖이면 아무것도 안 해요
    if (loading) return;               // 이미 불러오는 중이면 무시 (중복 요청 방지)

    loading = true;
    await onReach();   // 다음 페이지를 다 불러올 때까지 기다려요
    loading = false;   // 끝나면 빗장을 풀어 다음 감지를 허용
  });

  observer.observe(sentinel); // 이 순간부터 감시 시작
  return observer;            // 필요하면 observer.disconnect() 로 멈출 수 있어요
}
