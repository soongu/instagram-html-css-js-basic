// instagram-clone-frontend/js/image-filter.js
// H-1: 무거운 일을 백그라운드 일꾼(Web Worker)에게 맡겨, 화면이 멈추지 않게 해요.

// Vite 에게 "이 파일은 Worker 야"라고 알려주는 정식 표기예요.
// new URL(...) 로 경로를 주면, 빌드할 때 Vite 가 알아서 따로 묶어 줘요.
function createWorker() {
  return new Worker(new URL("./filter-worker.js", import.meta.url), { type: "module" });
}

// 첫 게시물 사진 아래에 'Worker 체험' 버튼을 달아, 무거운 계산을 백그라운드로 돌려요.
export function setupImageFilter(figure) {
  const worker = createWorker();

  const button = document.createElement("button");
  button.type = "button";
  button.className = "filter-btn";
  button.textContent = "무거운 계산 (Worker)";
  figure.append(button);

  button.addEventListener("click", () => {
    button.disabled = true;
    button.textContent = "계산 중...";
    // 메인은 이 편지만 보내고 곧장 손을 떼요 — 계산은 일꾼이 따로 해요.
    worker.postMessage({ type: "count", limit: 1_000_000_000 });
  });

  // 일꾼이 계산을 끝내고 편지를 돌려주면 이 함수가 깨어나요.
  worker.addEventListener("message", (e) => {
    if (e.data.type !== "count") return;
    console.log("백그라운드 계산 완료! 합계:", e.data.sum);
    button.disabled = false;
    button.textContent = "무거운 계산 (Worker)";
  });
}
