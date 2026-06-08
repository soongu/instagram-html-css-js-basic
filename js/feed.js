// instagram-clone-frontend/js/feed.js
// D-3: 서버에서 게시물을 받아 화면에 그려요.
//      지난 시간엔 게시물이 feed.html 에 글자로 박혀 있었는데,
//      이제 json-server 에서 데이터로 받아 와 직접 그려요.

import { fetchPosts } from "./api.js";
import { toggleLike } from "./like.js";
import { addComment, removeComment } from "./comment.js";
import { debounce, throttle } from "./util.js";

// 게시물 데이터(객체) 하나를 받아 <article> 한 채를 만들어 돌려줘요.
// D-1 에서 쓴 createElement / innerHTML 을 그대로 써요.
export function renderPost(post) {
  const article = document.createElement("article");
  article.innerHTML = `
    <header class="post-header">
      <a class="post-user" href="profile.html">
        <img class="post-avatar" src="${post.avatar}" alt="${post.username} 프로필 사진" width="32" height="32">
        <strong class="post-author">${post.username}</strong>
      </a>
      <time class="post-time">${post.time}</time>
    </header>
    <figure>
      <img src="${post.image}" alt="${post.alt}" width="600" height="600" loading="lazy">
    </figure>
    <div class="post-actions">
      <button type="button" class="icon-btn icon-btn-like" aria-label="좋아요">
        <svg class="ico" aria-hidden="true"><use href="assets/icons.svg#ico-heart"></use></svg></button>
      <button type="button" class="icon-btn" aria-label="댓글">
        <svg class="ico" aria-hidden="true"><use href="assets/icons.svg#ico-comment"></use></svg></button>
      <button type="button" class="icon-btn icon-btn-save" aria-label="저장">
        <svg class="ico" aria-hidden="true"><use href="assets/icons.svg#ico-save"></use></svg></button>
    </div>
    <p class="post-likes">좋아요 <strong>${post.likes.toLocaleString()}</strong>개</p>
    <p class="post-caption"><strong>${post.username}</strong> ${post.caption}</p>
    <p class="post-comments"><a href="#comments">댓글 ${post.commentCount}개 모두 보기</a></p>
    <ul class="comment-list"></ul>
    <form class="comment-form">
      <textarea class="comment-input" rows="1" placeholder="댓글 달기..." aria-label="댓글 입력"></textarea>
      <button type="submit">게시</button>
    </form>
  `;
  return article;
}

// 페이지가 열리면 서버에서 게시물을 받아 .feed-main 에 차례로 그려요.
async function loadFeed() {
  const posts = await fetchPosts(); // 서버 응답을 기다려요
  const feedMain = document.querySelector(".feed-main");
  for (const post of posts) {
    feedMain.append(renderPost(post)); // 데이터 한 칸 → article 한 채
  }
}

loadFeed();

// ===== 이벤트 위임 — main 한 곳에서 모든 클릭을 받아요 =====
// 핵심: 게시물은 fetch 가 끝난 뒤에야 생기는데, 위임이라 나중에 생긴 글에도 그대로 동작해요.
const feed = document.querySelector("main");

feed.addEventListener("click", (event) => {
  // 1) 좋아요 하트 — 안쪽 svg 를 눌러도 closest 가 버튼까지 올라가요
  const likeBtn = event.target.closest(".icon-btn-like");
  if (likeBtn) {
    const article = likeBtn.closest("article");
    const index = [...document.querySelectorAll("article")].indexOf(article);
    toggleLike(index);
    return;
  }

  // 2) 댓글 삭제 버튼
  const delBtn = event.target.closest(".comment-del");
  if (delBtn) {
    removeComment(delBtn.closest("li"));
  }
});

// ===== 댓글 폼 제출 — 이제 게시물마다 폼이 있어서 위임으로 받아요 =====
feed.addEventListener("submit", (event) => {
  const form = event.target.closest(".comment-form");
  if (!form) return;
  event.preventDefault(); // 폼의 기본 동작(새로고침)을 멈춰요

  const article = form.closest("article");
  const index = [...document.querySelectorAll("article")].indexOf(article);
  const input = form.querySelector(".comment-input");
  const text = input.value.trim();
  if (!text) return; // 빈 댓글은 무시

  addComment(index, text); // 그 게시물에 댓글 추가
  input.value = ""; // 입력칸 비우기
});

// ===== 입력 중 글자 수 — 디바운스 (입력이 멈춘 뒤 0.4초에 한 번만) =====
const showCount = debounce((value) => {
  console.log("현재 글자 수:", value.length);
}, 400);
feed.addEventListener("input", (event) => {
  const input = event.target.closest(".comment-input");
  if (input) showCount(input.value);
});

// ===== 스크롤 위치 — 스로틀 (0.3초에 한 번만) =====
const onScroll = throttle(() => {
  console.log("스크롤 위치:", Math.round(window.scrollY));
}, 300);
window.addEventListener("scroll", onScroll);
