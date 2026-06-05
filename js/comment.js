// instagram-clone-frontend/js/comment.js
// D-1: 댓글 추가/삭제 — createElement + append 로 만들어 붙이고, remove 로 지워요

// index 번째 게시물에 댓글 한 줄을 추가합니다. 콘솔: addComment(0, "예뻐요!")
export function addComment(index, text) {
  const article = document.querySelectorAll("article")[index];
  if (!article) {
    console.log("그런 게시물이 없어요:", index);
    return;
  }
  const list = article.querySelector(".comment-list");

  // 1) 빈 <li> 를 만들고 클래스를 붙여요
  const li = document.createElement("li");
  li.className = "comment";

  // 2) 댓글 글자는 textContent 로 (innerHTML 아님 — 남의 입력은 안전하게)
  const span = document.createElement("span");
  span.textContent = text;

  // 3) 삭제 버튼도 만들어 둬요 (실제 클릭 연결은 다음 시간 이벤트에서)
  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "comment-del";
  delBtn.textContent = "삭제";

  li.append(span, delBtn);  // append 는 여러 개를 한 번에 붙일 수 있어요
  list.append(li);          // 목록 맨 뒤에 추가 → 화면에 등장

  console.log("댓글 추가:", text);
  return li;                // 지울 때 쓰라고 만든 li 를 돌려줘요
}

// 댓글 한 줄(li 요소)을 화면에서 지웁니다.
// 콘솔: const li = addComment(0, "테스트"); removeComment(li);
export function removeComment(li) {
  if (!li) {
    console.log("지울 댓글이 없어요");
    return;
  }
  li.remove();   // 자기 자신을 트리에서 떼어내요
  console.log("댓글 삭제 완료");
}
