// instagram-clone-frontend/js/like-button.js
// H-3 Step 2: 좋아요 버튼을 '내 전용 태그' <like-button> 으로 만들어요.
//             한 번 정의해 두면 페이지 어디서든 <like-button></like-button> 한 줄로 불러 써요.

// HTMLElement 를 상속(extends)받으면, 내 클래스가 '진짜 HTML 태그' 가 돼요. (E-1 의 class 문법!)
class LikeButton extends HTMLElement {
  // 태그가 화면(DOM)에 '붙는 순간' 딱 한 번 불려요 — 첫 그림은 여기서 그려요.
  connectedCallback() {
    this.innerHTML = `
      <button type="button" class="like-btn">
        <span class="heart">♡</span>
        <span class="count">0</span>
      </button>
    `;
  }
}

// 정의한 클래스를 '태그 이름' 과 연결해요. 이름엔 반드시 하이픈(-)이 들어가야 해요.
// 그래야 브라우저 기본 태그(div·p…)와 안 겹친다고 약속돼 있어요.
customElements.define("like-button", LikeButton);
