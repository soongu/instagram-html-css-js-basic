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
    return;
  }

  // 사진의 모든 픽셀을 흑백으로 바꿔요. 픽셀이 수백만 개라 메인에서 하면 화면이 멈춰요.
  if (type === "grayscale") {
    const { buffer, width, height } = e.data;
    const pixels = new Uint8ClampedArray(buffer); // [R,G,B,A, R,G,B,A, ...] 네 칸이 한 점
    for (let i = 0; i < pixels.length; i += 4) {
      // 사람 눈이 느끼는 밝기 비율로 한 점의 회색 값을 구해요(초록을 가장 밝게 느껴요).
      const gray = pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114;
      pixels[i] = gray;     // R
      pixels[i + 1] = gray; // G
      pixels[i + 2] = gray; // B
      // pixels[i + 3] 은 투명도(A) — 안 건드려요
    }
    // 결과 버퍼를 '복사 없이' 돌려보내요(두 번째 인자 = 소유권 넘기기, Transferable).
    self.postMessage({ type: "grayscale", buffer: pixels.buffer, width, height }, [pixels.buffer]);
  }
};
