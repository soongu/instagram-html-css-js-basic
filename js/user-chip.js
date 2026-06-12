// instagram-clone-frontend/js/user-chip.js
// H-3 Step 6: <template> 으로 마크업을 한 번만 적어두고, <slot> 으로 바깥 콘텐츠를 끼워 넣어요.
//             <user-chip avatar="..."><a href="...">jaehoon</a></user-chip>

class UserChip extends HTMLElement {
  static get observedAttributes() {
    return ["avatar"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // HTML 에 적어둔 <template> 을 찾아, 그 내용을 복제(clone)해서 그림자 방에 넣어요.
    // 매번 innerHTML 문자열로 새로 만드는 대신, 미리 만든 틀을 복제하니 깔끔해요.
    const tpl = document.getElementById("user-chip-tpl");
    this.shadowRoot.appendChild(tpl.content.cloneNode(true));
  }

  connectedCallback() {
    this.update();
  }

  attributeChangedCallback() {
    this.update();
  }

  // 틀은 그대로 두고, 그림자 방 속 <img> 의 src 만 avatar 속성값으로 채워요.
  update() {
    const img = this.shadowRoot.querySelector(".avatar");
    if (img) img.src = this.getAttribute("avatar") || "";
  }
}

customElements.define("user-chip", UserChip);
