// instagram-clone-frontend/js/feed.js
// D-2: 이벤트 핸들링 — 지난 시간에 만든 함수(toggleLike·addComment·removeComment)를
//      클릭과 제출에 연결해, 콘솔을 직접 두드리지 않아도 화면에서 바로 동작하게 만들어요.

import { toggleLike } from "./like.js";
import { addComment, removeComment } from "./comment.js";
import { debounce, throttle } from "./util.js";

// 첫 게시물에 댓글 두 줄을 미리 깔아둬요. addComment 가 '삭제' 버튼까지 함께 만들어줘요.
addComment(0, "minji_ 사진 너무 예뻐요!");
addComment(0, "yuna 다음 여행 같이 가요");

// ===== 이벤트 위임 — main 한 곳에서 모든 클릭을 받아요 =====
// 게시물이 10개든 100개든 리스너는 여기 하나뿐. 클릭이 자식에서 부모로 올라오는(버블링) 덕분이에요.
const feed = document.querySelector("main");

feed.addEventListener("click", (event) => {
  // event.target = 실제로 눌린 가장 안쪽 요소. closest 로 위로 올라가며 진짜 대상을 찾아요.

  // 1) 좋아요 하트 — 안쪽 svg 를 눌러도 closest 가 버튼까지 올라가요
  const likeBtn = event.target.closest(".icon-btn-like");
  if (likeBtn) {
    const article = likeBtn.closest("article");
    const index = [...document.querySelectorAll("article")].indexOf(article);
    toggleLike(index);
    return;
  }

  // 2) 댓글 삭제 버튼 — 페이지 로드 뒤 새로 생긴 버튼도 위임이라 그대로 잡혀요
  const delBtn = event.target.closest(".comment-del");
  if (delBtn) {
    removeComment(delBtn.closest("li"));
  }
});

// ===== 댓글 폼 제출 — preventDefault 로 새로고침을 막아요 =====
const form = document.querySelector(".comment-form");
const input = form.querySelector(".comment-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();        // 폼의 기본 동작(페이지 새로고침)을 멈춰요
  const text = input.value.trim();
  if (!text) return;             // 빈 댓글은 무시
  addComment(0, text);           // 첫 게시물에 댓글 추가
  input.value = "";              // 입력칸 비우기
});

// ===== 입력 중 글자 수 — 디바운스 (입력이 멈춘 뒤 0.4초에 한 번만) =====
const showCount = debounce(() => {
  console.log("현재 글자 수:", input.value.length);
}, 400);
input.addEventListener("input", showCount);

// ===== 스크롤 위치 — 스로틀 (0.3초에 한 번만) =====
const onScroll = throttle(() => {
  console.log("스크롤 위치:", Math.round(window.scrollY));
}, 300);
window.addEventListener("scroll", onScroll);
