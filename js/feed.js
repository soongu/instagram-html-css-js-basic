// instagram-clone-frontend/js/feed.js
// D-1: DOM 조작 — 화면 요소를 찾아 읽고, 바꾸고, 만들고, 지우는 연습장
// Live Server 로 feed.html 을 열고 콘솔(F12 → Console)을 함께 보세요.

import { toggleLike } from "./like.js";
import { addComment, removeComment } from "./comment.js";

// ===== Step 2. 요소 찾기 — querySelector / querySelectorAll =====
// B 카테고리에서 CSS 로 쓰던 그 선택자 문법 그대로예요.
const firstLikes = document.querySelector(".post-likes");   // 맞는 첫 하나
console.log(firstLikes);                 // <p class="post-likes">좋아요 1,240개</p>

const allArticles = document.querySelectorAll("article");   // 맞는 것 전부 (NodeList)
console.log("게시물 개수:", allArticles.length);            // 게시물 개수: 10

// ===== Step 3. 내용 읽고 바꾸기 — textContent vs innerHTML =====
const caption = document.querySelector(".post-caption");
console.log(caption.textContent);   // 글자만: "jaehoon오늘의 일상 — ..."
console.log(caption.innerHTML);     // 태그째: "<strong>jaehoon</strong>오늘의..."

// ===== Step 4. 속성·클래스 조작 — getAttribute / classList =====
const firstArticle = document.querySelector("article");
const likeBtn = firstArticle.querySelector(".icon-btn-like");
console.log(likeBtn.getAttribute("aria-label"));      // "좋아요"
console.log(likeBtn.classList.contains("is-active")); // false (아직 안 눌렀어요)

// ===== Step 5. 요소 만들기 — createElement + append =====
// 첫 게시물의 댓글 목록(.comment-list)에 댓글 두 줄을 JS 로 만들어 붙여요.
const list = firstArticle.querySelector(".comment-list");

const c1 = document.createElement("li");      // 빈 <li> 를 메모리에 만들고
c1.className = "comment";
c1.textContent = "minji_ 사진 너무 예뻐요!";  // 글자를 넣고 (textContent — 안전)
list.append(c1);                              // 목록 맨 뒤에 붙이면 화면에 등장

const c2 = document.createElement("li");
c2.className = "comment";
c2.textContent = "yuna 다음 여행 같이 가요";
list.append(c2);

// ===== Step 6. 요소 지우기 — remove =====
// 방금 만든 두 번째 댓글(c2)을 화면에서 떼어내요. 첫 줄만 남죠.
c2.remove();

// ===== Step 7~8 실습은 콘솔에서 직접 불러서 확인해요 =====
// 모듈 안 함수는 콘솔에서 바로 안 보여서, window 에 붙여 둘게요.
window.toggleLike = toggleLike;
window.addComment = addComment;
window.removeComment = removeComment;
console.log("콘솔에서 toggleLike(0) 또는 addComment(0, '댓글!') 를 쳐보세요.");
