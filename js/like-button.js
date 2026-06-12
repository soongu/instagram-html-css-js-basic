// instagram-clone-frontend/js/like-button.js
// H-3 Step 5: <like-button> 에 '그림자 방(Shadow DOM)' 을 줘요.
//             바깥 CSS 가 못 들어오고, 안쪽 스타일도 안 새는 완전한 캡슐화예요.

class LikeButton extends HTMLElement {
  static get observedAttributes() {
    return ["count", "liked"];
  }

  constructor() {
    super(); // HTMLElement 의 생성자를 먼저 불러요 — 규칙이에요
    // 이 태그만의 '그림자 방' 을 하나 열어요. open 이면 바깥에서 el.shadowRoot 로 들여다볼 수 있어요.
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.onClick = () => this.toggle();
    // 클릭은 그림자 방(shadowRoot) 에서 들어요 — 방 안 버튼의 클릭이 여기로 올라와요.
    this.shadowRoot.addEventListener("click", this.onClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", this.onClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) this.render();
  }

  get count() {
    return Number(this.getAttribute("count")) || 0;
  }
  set count(value) {
    this.setAttribute("count", value);
  }

  get liked() {
    return this.hasAttribute("liked");
  }

  toggle() {
    if (this.liked) {
      this.removeAttribute("liked");
      this.count = this.count - 1;
    } else {
      this.setAttribute("liked", "");
      this.count = this.count + 1;
    }
  }

  // 그림자 방 안에 스타일과 마크업을 함께 그려요. 이 <style> 은 바깥으로 절대 안 새요.
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 0;
          background: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          color: #262626;
        }
        .heart { font-size: 1.4rem; line-height: 1; }
        /* :host 는 <like-button> 태그 자기 자신을 가리켜요 — liked 속성이 있을 때만 빨갛게. */
        :host([liked]) .heart { color: #ed4956; }
      </style>
      <button type="button" aria-pressed="${this.liked}">
        <span class="heart">${this.liked ? "♥" : "♡"}</span>
        <span class="count">${this.count.toLocaleString()}</span>
      </button>
    `;
  }
}

customElements.define("like-button", LikeButton);
