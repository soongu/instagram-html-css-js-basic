// instagram-clone-frontend/js/image-filter.js
// H-1: 무거운 일을 백그라운드 일꾼(Web Worker)에게 맡겨, 화면이 멈추지 않게 해요.

// Vite 에게 "이 파일은 Worker 야"라고 알려주는 정식 표기예요.
// new URL(...) 로 경로를 주면, 빌드할 때 Vite 가 알아서 따로 묶어 줘요.
function createWorker() {
  return new Worker(new URL("./filter-worker.js", import.meta.url), { type: "module" });
}

// 첫 게시물 사진 아래에 버튼을 달고, 무거운 일을 Worker 로 돌려요.
export function setupImageFilter(figure) {
  const img = figure.querySelector("img");
  if (!img) return;
  const worker = createWorker();

  // 'Worker 체험' 버튼 — 무거운 계산을 백그라운드로 돌려도 화면은 안 멈춰요.
  const countBtn = document.createElement("button");
  countBtn.type = "button";
  countBtn.className = "filter-btn";
  countBtn.textContent = "무거운 계산 (Worker)";
  figure.append(countBtn);

  countBtn.addEventListener("click", () => {
    countBtn.disabled = true;
    countBtn.textContent = "계산 중...";
    // 메인은 이 편지만 보내고 곧장 손을 떼요 — 계산은 일꾼이 따로 해요.
    worker.postMessage({ type: "count", limit: 1_000_000_000 });
  });

  // '흑백' 버튼 — 사진의 픽셀을 일꾼에게 보내 흑백으로 바꿔 받아요.
  const grayBtn = document.createElement("button");
  grayBtn.type = "button";
  grayBtn.className = "filter-btn";
  grayBtn.textContent = "흑백";
  figure.append(grayBtn);

  grayBtn.addEventListener("click", () => {
    grayBtn.disabled = true;
    // 다른 도메인(picsum) 사진의 픽셀을 읽으려면 'crossOrigin 허락'을 받아 새로 불러와요.
    const source = new Image();
    source.crossOrigin = "anonymous";
    source.onload = () => {
      // 1) 사진을 보이지 않는 canvas 에 그려서 픽셀(ImageData)을 꺼내요.
      const canvas = document.createElement("canvas");
      canvas.width = source.naturalWidth;
      canvas.height = source.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(source, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // 2) 픽셀 버퍼를 일꾼에게 '복사 없이' 넘겨요(Transferable). 넘긴 뒤 메인 버퍼는 비어요.
      worker.postMessage(
        { type: "grayscale", buffer: imageData.data.buffer, width: canvas.width, height: canvas.height },
        [imageData.data.buffer]
      );
    };
    source.src = img.currentSrc || img.src;
  });

  // 일꾼이 보낸 편지를 받는 곳 — type 으로 어떤 답인지 갈라요.
  worker.addEventListener("message", (e) => {
    if (e.data.type === "count") {
      console.log("백그라운드 계산 완료! 합계:", e.data.sum);
      countBtn.disabled = false;
      countBtn.textContent = "무거운 계산 (Worker)";
      return;
    }
    if (e.data.type === "grayscale") {
      // 3) 흑백으로 바뀐 버퍼를 canvas 에 다시 칠해, 원본 사진을 흑백으로 교체해요.
      const { buffer, width, height } = e.data;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.className = "post-photo-canvas";
      const ctx = canvas.getContext("2d");
      const pixels = new Uint8ClampedArray(buffer);
      ctx.putImageData(new ImageData(pixels, width, height), 0, 0);
      img.replaceWith(canvas); // 원본 <img> 를 흑백 <canvas> 로 교체
      grayBtn.textContent = "흑백 완료";
    }
  });
}
