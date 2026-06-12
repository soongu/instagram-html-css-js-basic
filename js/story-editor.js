// instagram-clone-frontend/js/story-editor.js
// H-2 Step 5 (핵심 실습): 사진 위에 글자를 얹는 인스타 스토리 편집기.
// Step 1~3에서 익힌 drawImage·fillText·이벤트 드래그를 한데 모았어요.

export function setupStoryEditor(canvas, options = {}) {
  const ctx = canvas.getContext("2d");

  const texts = [];    // 화면에 얹은 글자들 — 각자 위치(x, y)·내용·색을 가져요.
  let photo = null;    // 배경 사진(불러오면 채워져요)
  let dragging = null; // 지금 끌고 있는 글자

  // 배경 사진을 불러와요(다른 도메인이라 crossOrigin 허락을 받아요).
  function loadPhoto(src) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      photo = img;
      render();
    };
    img.src = src;
  }

  // 글자 하나 추가 — 한가운데에서 시작해요.
  function addText(value, color) {
    texts.push({ text: value, x: canvas.width / 2, y: canvas.height / 2, color });
    render();
  }

  // 전체를 다시 그려요: 사진 → 글자들 순서(나중에 넣은 글자가 위에).
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (photo) {
      ctx.drawImage(photo, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = "#efefef";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const t of texts) {
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, t.x, t.y);
    }
  }

  function getPos(event) {
    const rect = canvas.getBoundingClientRect();
    // 보이는 크기와 실제 canvas 해상도가 다를 수 있어 비율로 보정해요.
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  // 누른 지점 근처의 글자를 잡아요.
  canvas.addEventListener("mousedown", (event) => {
    const { x, y } = getPos(event);
    dragging = texts.find((t) => Math.abs(t.x - x) < 120 && Math.abs(t.y - y) < 28) || null;
  });
  canvas.addEventListener("mousemove", (event) => {
    if (!dragging) return;
    const { x, y } = getPos(event);
    dragging.x = x;
    dragging.y = y;
    render();
  });
  canvas.addEventListener("mouseup", () => {
    dragging = null;
  });

  // "글자 추가" 버튼
  if (options.addBtn && options.textInput) {
    options.addBtn.addEventListener("click", () => {
      const value = options.textInput.value.trim();
      if (!value) return;
      addText(value, options.colorInput ? options.colorInput.value : "#ffffff");
      options.textInput.value = "";
    });
  }
  // "저장" — canvas 그림을 PNG 데이터로 바꿔 내려받아요.
  if (options.saveBtn) {
    options.saveBtn.addEventListener("click", () => {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "my-story.png";
      link.click();
    });
  }

  loadPhoto(options.photoSrc || "https://picsum.photos/seed/story/480/600");
}

const editor = document.getElementById("editor");
if (editor) {
  setupStoryEditor(editor, {
    textInput: document.getElementById("story-text"),
    colorInput: document.getElementById("story-color"),
    addBtn: document.getElementById("add-text"),
    saveBtn: document.getElementById("save-story"),
  });
}
