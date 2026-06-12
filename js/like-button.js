// instagram-clone-frontend/js/like-button.js
// H-3 Step 3: <like-button> 에 '생명' 을 넣어요 — 누르면 좋아요가 켜지고 꺼져요.
//             라이프사이클 콜백으로 이벤트를 걸고(붙을 때), 정리해요(떨어질 때).

class LikeButton extends HTMLElement {
  // 태그가 화면(DOM)에 '붙는 순간' — 첫 그림을 그리고, 클릭을 듣기 시작해요.
  connectedCallback() {
    this.liked = false; // 좋아요 켜짐/꺼짐 상태
    this.count = 1240; // 좋아요 수 (다음 단계에서 속성으로 바깥에서 받아와요)
    this.render();

    // 클릭하면 toggle 을 부르도록 연결해요. 정리할 때 똑같은 함수를 떼어내야 해서,
    // 변수에 담아 둬요. (이름 없는 함수면 나중에 못 떼어내요.)
    this.onClick = () => this.toggle();
    this.addEventListener("click", this.onClick);
  }

  // 태그가 화면에서 '떨어질 때' — 걸어둔 이벤트를 떼어내 메모리 누수를 막아요.
  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }

  // 좋아요를 켜고 꺼요 — 상태를 뒤집고, 숫자를 1 올리거나 내린 뒤 다시 그려요.
  toggle() {
    this.liked = !this.liked;
    this.count = this.liked ? this.count + 1 : this.count - 1;
    this.render();
  }

  // 지금 상태대로 버튼 속을 그려요.
  render() {
    this.innerHTML = `
      <button type="button" class="like-btn" aria-pressed="${this.liked}">
        <span class="heart">${this.liked ? "♥" : "♡"}</span>
        <span class="count">${this.count.toLocaleString()}</span>
      </button>
    `;
  }
}

customElements.define("like-button", LikeButton);
