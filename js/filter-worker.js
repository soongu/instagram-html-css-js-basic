// instagram-clone-frontend/js/filter-worker.js
// H-1: 백그라운드 일꾼(Web Worker) 스크립트.
//      메인 스레드(화면을 그리는 일꾼)와 떨어진 곳에서 무거운 일을 대신 해요.
//      서로 변수를 직접 공유하진 않고, 오직 편지(postMessage)로만 주고받아요.

// 메인에서 편지가 오면 이 함수가 깨어나요. e.data 에 보낸 내용이 담겨 있어요.
self.onmessage = (e) => {
  const { type } = e.data;

  // '무거운 계산' 흉내 — 0부터 limit 까지 한 땀씩 더해요. 일부러 시간이 걸려요.
  if (type === "count") {
    const { limit } = e.data;
    let sum = 0;
    for (let i = 0; i < limit; i++) {
      sum += i;
    }
    self.postMessage({ type: "count", sum }); // 다 끝나면 결과를 편지로 돌려보내요
  }
};
