// instagram-clone-frontend/js/feed.js
// D-4: 서버에서 게시물을 "한 페이지씩" 받아 무한 스크롤로 그려요.
//      댓글은 fetch(POST)로 서버에 저장한 뒤 화면에 반영해요.

import { fetchPosts, createComment } from "./api.js";
import { toggleLike } from "./like.js";
import { addComment, removeComment } from "./comment.js";
import { setupInfiniteScroll } from "./infinite-scroll.js";

// 게시물 데이터(객체) 하나를 받아 <article> 한 채를 만들어 돌려줘요.
export function renderPost(post) {
  const article = document.createElement("article");
  article.dataset.postId = post.id; // 어느 게시물인지 기억해 둬요 (댓글 POST 에 필요)
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

const feedMain = document.querySelector(".feed-main");

// 목록 맨 아래의 "감시병" — 이게 화면에 보이면 다음 페이지를 불러와요.
const sentinel = document.createElement("div");
sentinel.className = "scroll-sentinel";
feedMain.append(sentinel);

// ===== 로딩 표시 — 불러오는 동안 스피너를 보여줘요 =====
function showLoading() {
  const box = document.createElement("div");
  box.className = "loading";
  box.innerHTML = `<span class="spinner" aria-hidden="true"></span> 불러오는 중...`;
  feedMain.insertBefore(box, sentinel); // 감시병 바로 위에 끼워 넣어요
  return box;
}

// ===== 에러 토스트 — 잠깐 떴다 사라지는 알림 =====
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  setTimeout(() => toast.remove(), 3000); // 3초 뒤 스스로 사라져요
}

// ===== 페이지 단위 로딩 =====
let currentPage = 1; // 다음에 불러올 페이지 번호
let hasMore = true;  // 더 받을 게 남았는지

async function loadPage() {
  const loadingBox = showLoading();
  try {
    const result = await fetchPosts(currentPage); // { data, next, ... }
    for (const post of result.data) {
      feedMain.insertBefore(renderPost(post), sentinel); // 감시병 위에 차례로
    }
    hasMore = result.next !== null; // next 가 null 이면 마지막 페이지
    currentPage += 1;
  } catch (error) {
    showToast(error.message); // 실패하면 사용자에게 알려요
  } finally {
    loadingBox.remove(); // 성공이든 실패든 스피너는 치워요
  }
}

// ===== 무한 스크롤 — 감시병이 보일 때마다 다음 페이지 =====
setupInfiniteScroll(sentinel, async () => {
  if (!hasMore) return; // 다 불러왔으면 더 안 해요
  await loadPage();
});

loadPage(); // 첫 페이지를 바로 불러와요

// ===== 이벤트 위임 — main 한 곳에서 모든 클릭을 받아요 =====
const feed = document.querySelector("main");

feed.addEventListener("click", (event) => {
  // 1) 좋아요 하트
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

// ===== 댓글 폼 제출 — 서버에 저장(POST)한 뒤 화면에 반영 =====
feed.addEventListener("submit", async (event) => {
  const form = event.target.closest(".comment-form");
  if (!form) return;
  event.preventDefault(); // 폼의 기본 동작(새로고침)을 멈춰요

  const article = form.closest("article");
  const input = form.querySelector(".comment-input");
  const text = input.value.trim();
  if (!text) return; // 빈 댓글은 무시

  const postId = Number(article.dataset.postId);
  try {
    const saved = await createComment(postId, text); // 1) 서버에 저장(POST)
    const index = [...document.querySelectorAll("article")].indexOf(article);
    addComment(index, saved.text);                    // 2) 응답을 화면에 추가
    input.value = "";                                 // 3) 입력칸 비우기
  } catch (error) {
    showToast("댓글을 저장하지 못했어요: " + error.message);
  }
});
