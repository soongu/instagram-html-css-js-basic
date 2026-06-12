// instagram-clone-frontend/js/mini-chart.js
// H-2 Step 6: 라이브러리 없이, fillRect 와 fillText 만으로 막대 그래프를 직접 그려요.

// 요일별 좋아요 수 — "내 게시물 주간 좋아요 추이"
const weeklyLikes = [
  { label: "월", value: 120 },
  { label: "화", value: 200 },
  { label: "수", value: 150 },
  { label: "목", value: 280 },
  { label: "금", value: 240 },
  { label: "토", value: 360 },
  { label: "일", value: 300 },
];

export function drawBarChart(ctx, data) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  const padding = 40;             // 축 둘레 여백
  const chartH = H - padding * 2; // 막대가 자라는 높이
  const max = Math.max(...data.map((d) => d.value));
  const slot = (W - padding * 2) / data.length; // 막대 하나가 차지하는 폭
  const barW = slot * 0.6;

  ctx.clearRect(0, 0, W, H);

  // 바닥 축선
  ctx.strokeStyle = "#dbdbdb";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, H - padding);
  ctx.lineTo(W - padding, H - padding);
  ctx.stroke();

  data.forEach((d, i) => {
    const barH = (d.value / max) * chartH;  // 값에 비례한 높이
    const x = padding + slot * i + (slot - barW) / 2;
    const y = (H - padding) - barH;         // 좌상단 원점이라, 바닥에서 위로 자라요

    // 막대
    ctx.fillStyle = "#0095f6";
    ctx.fillRect(x, y, barW, barH);

    // 값 라벨(막대 위)
    ctx.fillStyle = "#262626";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(d.value), x + barW / 2, y - 6);

    // 요일 라벨(축 아래)
    ctx.fillStyle = "#6e6e6e";
    ctx.fillText(d.label, x + barW / 2, H - padding + 16);
  });
}

const mini = document.getElementById("mini-chart");
if (mini) {
  drawBarChart(mini.getContext("2d"), weeklyLikes);
}
