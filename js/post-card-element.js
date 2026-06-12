// instagram-clone-frontend/js/post-card-element.js
// H-3 Step 7: 지금까지 배운 걸 다 합쳐, 인스타 게시물 카드를 '내 전용 태그' <post-card> 로 만들어요.
//             E-1 의 PostCard '클래스' 가, 이제 진짜 HTML 태그가 돼요.
//   <post-card username="jaehoon" avatar="..." image="..." likes="1240">
//     오늘 날씨 최고 ☀️
//   </post-card>

class PostCardElement extends HTMLElement {
  static get observedAttributes() {
    return ["username", "avatar", "image", "likes"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // 카드 틀을 <template> 에서 복제해 와요 (Step 6 에서 배운 방식).
    const tpl = document.getElementById("post-card-tpl");
    this.shadowRoot.appendChild(tpl.content.cloneNode(true));
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  // 틀의 빈칸을 속성값으로 채워요. 좋아요 자리엔 우리가 만든 <like-button> 이 이미 끼워져 있어요.
  update() {
    const root = this.shadowRoot;
    root.querySelector(".avatar").src = this.getAttribute("avatar") || "";
    root.querySelector(".username").textContent = this.getAttribute("username") || "";
    root.querySelector(".photo").src = this.getAttribute("image") || "";
    // 작은 조각이 큰 조각 안으로! Step 2~5 에서 만든 <like-button> 에 좋아요 수만 넘겨줘요.
    root.querySelector(".like-slot").setAttribute("count", this.getAttribute("likes") || "0");
  }
}

customElements.define("post-card", PostCardElement);
