// instagram-clone-frontend/js/feed.js
// D-4: 서버에서 게시물을 "한 페이지씩" 받아 무한 스크롤로 그려요.
//      댓글은 fetch(POST)로 서버에 저장한 뒤 화면에 반영해요.
// E-1: 게시물 카드를 만들던 renderPost 함수가 PostCard 클래스로 이사 갔어요.
//      (게시물 한 채 = 인스턴스 하나. 광고 카드는 AdPostCard 가 상속으로 변형해요.)

import { fetchPosts, createComment } from "./api.js";
import { ApiError } from "./api-error.js";
import { toggleLike } from "./like.js";
import { addComment, removeComment } from "./comment.js";
import { setupInfiniteScroll } from "./infinite-scroll.js";
import { PostCard, AdPostCard } from "./post-card.js";
import { ThemeToggle } from "./theme-toggle.js";

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
    result.data.forEach((post, index) => {
      // 매 페이지의 마지막(3번째, index 2) 게시물은 광고 카드로 그려요.
      // 같은 데이터, 다른 모습 — 상속(AdPostCard extends PostCard) 데모예요.
      const card = index === 2 ? new AdPostCard(post) : new PostCard(post);
      feedMain.insertBefore(card.render(), sentinel); // 감시병 위에 차례로
    });
    hasMore = result.next !== null; // next 가 null 이면 마지막 페이지
    currentPage += 1;
  } catch (error) {
    if (error instanceof ApiError) {
      // 사용자에겐 친화 메시지만 보여줘요. (상태 코드·주소 같은 속사정은 감춰요)
      showToast(error.userMessage);
      // 개발자에겐 전체를 콘솔에 남겨요. message(상태·주소) + stack 까지 다 찍혀요.
      // 운영 환경이라면 이 자리에서 { statusCode, userMessage } 만 추려 로그 서버로 보내요.
      console.error("게시물 로딩 실패:", error);
    } else {
      // ApiError 가 아닌 예상 밖의 에러(코드 버그 등)는 따로 처리해요.
      showToast("알 수 없는 오류가 발생했어요.");
      console.error(error);
    }
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

feed.addEventListener("click", async (event) => {
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
    return;
  }

  // 3) 이모지 버튼 — 누르는 그 순간에야 이모지 고르개 모듈을 받아와요(동적 import).
  //    필요할 때만 불러오니 첫 화면은 그만큼 가벼워져요.
  const emojiBtn = event.target.closest(".comment-emoji");
  if (emojiBtn) {
    const input = emojiBtn.closest(".comment-form").querySelector(".comment-input");
    try {
      // import()는 Promise 를 돌려줘요 — 모듈이 도착할 때까지 기다렸다(await) 꺼내 써요.
      const { openEmojiPicker } = await import("./emoji-picker.js");
      openEmojiPicker(emojiBtn, input);
    } catch (error) {
      // 네트워크로 받아오다 실패할 수도 있어요 — 비동기가 있는 곳엔 에러 처리가 따라다녀요.
      showToast("이모지 고르개를 불러오지 못했어요.");
      console.error("emoji-picker 로딩 실패:", error);
    }
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
    if (error instanceof ApiError) {
      showToast(error.userMessage); // 같은 패턴 — 받는 쪽은 userMessage 만 보여줘요
    } else {
      showToast("댓글을 저장하지 못했어요.");
    }
    console.error("댓글 저장 실패:", error);
  }
});

// ===== 다크 모드 토글 — ThemeToggle 클래스(E-1)가 복원·클릭·저장을 책임져요 =====
const themeButton = document.querySelector(".theme-toggle");
if (themeButton) {
  new ThemeToggle(themeButton, "theme").init();
}
