// instagram-clone-frontend/js/emoji-picker.js
// E-3: 동적 import()로 "필요할 때만" 불러오는 모듈이에요.
//      댓글창 옆 이모지 버튼을 처음 누르는 순간에야 네트워크로 받아와요.
//      그래서 첫 화면 번들에는 이 코드가 들어가지 않아요(코드 스플리팅).

import { debounce } from "./util.js";

// 고르개에 깔아둘 이모지 목록 — 이름(키워드)으로 검색할 수 있게 라벨을 같이 둬요.
const EMOJIS = [
  { char: "😀", name: "웃음" },
  { char: "😂", name: "눈물 웃음" },
  { char: "😍", name: "하트 눈" },
  { char: "🥰", name: "사랑" },
  { char: "😎", name: "선글라스" },
  { char: "😭", name: "울음" },
  { char: "👍", name: "좋아요 따봉" },
  { char: "🙏", name: "기도 감사" },
  { char: "🔥", name: "불 인기" },
  { char: "🎉", name: "축하 파티" },
  { char: "❤️", name: "하트" },
  { char: "✨", name: "반짝 빛" },
];

let panel = null; // 패널은 한 번만 만들어 재사용해요

// 패널 뼈대(검색창 + 이모지 격자)를 한 번 만들어 body 에 붙여요.
function buildPanel() {
  const box = document.createElement("div");
  box.className = "emoji-picker";
  box.innerHTML = `
    <input type="search" class="emoji-search" placeholder="이모지 검색..." aria-label="이모지 검색">
    <div class="emoji-grid"></div>
  `;
  document.body.append(box);
  return box;
}

// 키워드로 거른 이모지들을 격자에 다시 그려요. 버튼을 누르면 댓글창에 끼워 넣어요.
function renderGrid(grid, targetInput, keyword = "") {
  const q = keyword.trim();
  const list = q ? EMOJIS.filter((e) => e.name.includes(q)) : EMOJIS;
  grid.innerHTML = "";
  list.forEach((e) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "emoji-item";
    btn.textContent = e.char;
    btn.addEventListener("click", () => {
      targetInput.value += e.char; // 댓글창에 이모지를 끼워 넣어요
      targetInput.focus();
    });
    grid.append(btn);
  });
}

// 이모지 고르개를 anchor 버튼 근처에 띄워요. 고른 이모지는 targetInput 에 들어가요.
export function openEmojiPicker(anchorButton, targetInput) {
  if (!panel) panel = buildPanel();
  const grid = panel.querySelector(".emoji-grid");
  const search = panel.querySelector(".emoji-search");

  renderGrid(grid, targetInput);

  // 검색창 입력은 디바운스 — 다 치고 손을 뗀 뒤에야 한 번 걸러요(util.js 의 debounce 재사용).
  search.oninput = debounce(() => renderGrid(grid, targetInput, search.value), 200);

  // anchor 버튼 위치에 맞춰 패널을 띄워요.
  const rect = anchorButton.getBoundingClientRect();
  panel.style.left = `${rect.left}px`;
  panel.style.top = `${rect.bottom + 6}px`;
  panel.hidden = false;
}
