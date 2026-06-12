// instagram-clone-frontend/js/drawing-board.js
// H-2 Step 3: 마우스를 따라 선을 긋는 드로잉 보드. 경로(Path)와 이벤트로 그려요.

export function setupDrawingBoard(canvas, options = {}) {
  const ctx = canvas.getContext("2d");
  ctx.lineCap = "round";  // 선의 끝을 둥글게
  ctx.lineJoin = "round"; // 선이 꺾이는 모서리를 둥글게

  let drawing = false;

  // 마우스 화면 좌표를 canvas 내부 좌표로 바꿔요.
  function getPos(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  canvas.addEventListener("mousedown", (event) => {
    drawing = true;
    const { x, y } = getPos(event);
    ctx.beginPath();  // 새 경로 시작
    ctx.moveTo(x, y); // 붓을 들어 시작점으로 이동
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!drawing) return;
    const { x, y } = getPos(event);
    ctx.lineTo(x, y); // 직전 점에서 여기까지 선을 잇고
    ctx.stroke();     // 실제로 그어요
  });

  // 버튼을 떼거나 영역 밖으로 나가면 멈춰요.
  function stop() {
    drawing = false;
  }
  canvas.addEventListener("mouseup", stop);
  canvas.addEventListener("mouseleave", stop);

  // 색·굵기 컨트롤이 있으면 연결해요.
  if (options.colorInput) {
    ctx.strokeStyle = options.colorInput.value;
    options.colorInput.addEventListener("input", (e) => {
      ctx.strokeStyle = e.target.value;
    });
  }
  if (options.sizeInput) {
    ctx.lineWidth = Number(options.sizeInput.value);
    options.sizeInput.addEventListener("input", (e) => {
      ctx.lineWidth = Number(e.target.value);
    });
  }
  // 전체 지우개
  if (options.clearBtn) {
    options.clearBtn.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }
}

const board = document.getElementById("board");
if (board) {
  setupDrawingBoard(board, {
    colorInput: document.getElementById("pen-color"),
    sizeInput: document.getElementById("pen-size"),
    clearBtn: document.getElementById("clear-board"),
  });
}
