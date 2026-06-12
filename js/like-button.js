// instagram-clone-frontend/js/like-button.js
// H-3 Step 4: 좋아요 수를 코드에 박지 말고, HTML 속성으로 바깥에서 받아와요.
//             <like-button count="1240"></like-button> 처럼요.

class LikeButton extends HTMLElement {
  // 어떤 속성을 '지켜볼지' 미리 알려줘요 — 여기 적은 속성이 바뀔 때만 감지해요.
  static get observedAttributes() {
    return ["count", "liked"];
  }

  connectedCallback() {
    this.render();
    this.onClick = () => this.toggle();
    this.addEventListener("click", this.onClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.onClick);
  }

  // observedAttributes 에 적은 속성이 바뀔 때마다 자동으로 불려요 — 바뀐 값으로 다시 그려요.
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  // count 속성을 평범한 프로퍼티처럼 읽고 쓰게 해줘요 — el.count 로요.
  get count() {
    return Number(this.getAttribute("count")) || 0;
  }
  set count(value) {
    this.setAttribute("count", value); // 속성을 바꾸면 attributeChangedCallback 이 다시 그려줘요
  }

  // liked 는 '있다/없다' 로 표현해요 — <like-button liked> 처럼 값이 없는 속성.
  get liked() {
    return this.hasAttribute("liked");
  }

  // 좋아요를 켜고 꺼요 — liked 속성을 달거나 떼고, 숫자를 1 올리거나 내려요.
  toggle() {
    if (this.liked) {
      this.removeAttribute("liked");
      this.count = this.count - 1;
    } else {
      this.setAttribute("liked", "");
      this.count = this.count + 1;
    }
  }

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
