// instagram-clone-frontend/js/like-chart.js
// H-2 Step 7: Step 6에서 손으로 그린 그 차트를, 라이브러리(Chart.js)로 한 번에.
// Chart 는 CDN <script> 가 전역(window)에 올려둔 객체예요(import 가 아니에요).

const weeklyLikes = [
  { label: "월", value: 120 },
  { label: "화", value: 200 },
  { label: "수", value: 150 },
  { label: "목", value: 280 },
  { label: "금", value: 240 },
  { label: "토", value: 360 },
  { label: "일", value: 300 },
];

const target = document.getElementById("like-chart");
const ChartLib = window.Chart; // CDN 이 올려둔 전역 Chart

if (target && ChartLib) {
  new ChartLib(target, {
    type: "bar",
    data: {
      labels: weeklyLikes.map((d) => d.label),
      datasets: [
        {
          label: "주간 좋아요",
          data: weeklyLikes.map((d) => d.value),
          backgroundColor: "#0095f6",
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
}
