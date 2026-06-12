// instagram-clone-frontend/js/canvas-basics.js
// H-2 Step 1~2: 흑백 필터에서 픽셀을 읽던 그 canvas로, 이번엔 직접 그려요.

// canvas 하나를 받아 2D 붓(context)을 꺼내고, 도형·텍스트·그래디언트를 그려요.
export function setupCanvasBasics(canvas) {
  const ctx = canvas.getContext("2d");
  drawShapes(ctx);
  drawText(ctx);
  drawGradientBar(ctx);
}

// Step 1 — 도형: 칠한 사각형, 테두리 사각형, 원
function drawShapes(ctx) {
  // 그리기 전에 화면을 비워요(좌상단 0,0 부터 전체).
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // ① 칠한 사각형 — (x, y)는 좌상단 모서리, 그 뒤가 너비·높이
  ctx.fillStyle = "#0095f6";
  ctx.fillRect(40, 40, 120, 80);

  // ② 테두리만 있는 사각형
  ctx.strokeStyle = "#262626";
  ctx.lineWidth = 3;
  ctx.strokeRect(200, 40, 120, 80);

  // ③ 원 — arc(중심x, 중심y, 반지름, 시작각, 끝각). 한 바퀴 = 2π
  ctx.beginPath();
  ctx.arc(120, 250, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#ed4956";
  ctx.fill();
}

// Step 2 — 텍스트: 글꼴·정렬을 정하고 글자를 찍어요.
function drawText(ctx) {
  ctx.fillStyle = "#262626";
  ctx.font = "bold 24px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("좋아요 1,240개", 200, 200);

  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#6e6e6e";
  ctx.fillText("jaehoon 외 여러 명", 200, 228);
}

// Step 2 — 선형 그래디언트로 칠한 막대 (스토리 하이라이트 느낌)
function drawGradientBar(ctx) {
  // (x0,y0) → (x1,y1) 방향으로 색이 흐르는 그래디언트
  const gradient = ctx.createLinearGradient(200, 0, 440, 0);
  gradient.addColorStop(0, "#feda75");
  gradient.addColorStop(0.5, "#d62976");
  gradient.addColorStop(1, "#4f5bd5");

  ctx.fillStyle = gradient;
  ctx.fillRect(200, 280, 240, 40);
}

// 페이지가 열리면 데모 canvas에 바로 그려요.
const canvas = document.getElementById("basics");
if (canvas) {
  setupCanvasBasics(canvas);
}
