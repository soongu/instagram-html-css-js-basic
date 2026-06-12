// instagram-clone-frontend/js/canvas-animation.js
// H-2 Step 4: requestAnimationFrame 으로 매 프레임 다시 그려, 초당 60장으로 움직여요.

export function setupBouncingBall(canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // 공의 상태 — 위치(x, y)와 속도(vx, vy)
  const ball = { x: 60, y: 60, r: 24, vx: 3.2, vy: 2.4 };
  let rafId = null;

  function draw() {
    // 1) 지난 프레임을 지워요(안 지우면 잔상이 길게 남아요).
    ctx.clearRect(0, 0, W, H);

    // 2) 위치를 속도만큼 옮기고, 벽에 닿으면 방향을 뒤집어요.
    ball.x += ball.vx;
    ball.y += ball.vy;
    if (ball.x - ball.r < 0 || ball.x + ball.r > W) ball.vx *= -1;
    if (ball.y - ball.r < 0 || ball.y + ball.r > H) ball.vy *= -1;

    // 3) 새 위치에 공을 그려요.
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#0095f6";
    ctx.fill();

    // 4) 다음 프레임을 예약해요 — 브라우저가 다음 새로고침 직전에 draw 를 또 불러요.
    rafId = requestAnimationFrame(draw);
  }

  function start() {
    if (rafId === null) draw();
  }

  function stop() {
    if (rafId !== null) {
      cancelAnimationFrame(rafId); // 예약을 취소해 멈춰요.
      rafId = null;
    }
  }

  if (options.startBtn) options.startBtn.addEventListener("click", start);
  if (options.stopBtn) options.stopBtn.addEventListener("click", stop);

  start(); // 페이지가 열리면 바로 굴러가요.
}

const stage = document.getElementById("stage");
if (stage) {
  setupBouncingBall(stage, {
    startBtn: document.getElementById("anim-start"),
    stopBtn: document.getElementById("anim-stop"),
  });
}
