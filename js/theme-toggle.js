// instagram-clone-frontend/js/theme-toggle.js
// E-1: 다크 모드 토글을 책임지는 클래스.
//      <html> 의 data-theme 을 light/dark 로 갈아끼우면,
//      variables.css 의 [data-theme="dark"] 가 의미 토큰을 어두운 값으로 바꿔요.

export class ThemeToggle {
  constructor(button, storageKey) {
    this.button = button;         // 토글 버튼 요소
    this.storageKey = storageKey; // localStorage 서랍 이름 (예: "theme")
  }

  // 클릭 핸들러를 "클래스 필드 + 화살표 함수"로 — addEventListener 에 떼어 넘겨도
  // this 가 인스턴스에 고정돼요 (this 를 잃어버리는 함정의 해법 ②를 실전 적용).
  handleClick = () => {
    this.toggle();
  };

  // 페이지가 열릴 때 한 번 — 저장된 테마를 복원하고, 버튼에 클릭을 연결해요.
  init() {
    const saved = localStorage.getItem(this.storageKey); // "dark" | "light" | null
    if (saved) {
      document.documentElement.dataset.theme = saved; // <html data-theme="..."> 복원
    }
    this.button.addEventListener("click", this.handleClick);
  }

  // 현재 테마를 반대로 — <html> 의 data-theme 을 바꾸고 localStorage 에 기억해요.
  // "light" 도 명시해서 저장해요 — 운영체제가 다크여도 사용자의 라이트 선택이 이겨요.
  toggle() {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(this.storageKey, next);
  }
}
