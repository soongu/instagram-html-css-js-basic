// instagram-clone-frontend/js/util.js
// D-2: 디바운스 · 스로틀 — 이벤트가 너무 자주 터질 때 함수 호출 횟수를 줄여요.

// 디바운스(debounce, 튕김 방지): 호출이 멈추고 delay(ms)가 지나면 그때 딱 한 번 실행.
// 입력할 때마다가 아니라 "다 치고 손을 뗀 뒤"에 한 번 — 검색어 검사·글자 수 세기에 어울려요.
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);                          // 이전에 예약해둔 실행을 취소하고
    timer = setTimeout(() => fn(...args), delay); // 새로 delay 뒤 실행을 예약
  };
}

// 스로틀(throttle, 양 조절): delay(ms)마다 최대 한 번만 실행. 그 사이 호출은 그냥 무시.
// 스크롤·리사이즈처럼 1초에 수십 번 터지는 이벤트를 솎아낼 때 써요.
export function throttle(fn, delay) {
  let waiting = false;
  return (...args) => {
    if (waiting) return;                          // 쿨다운 중이면 무시
    fn(...args);                                  // 한 번 실행하고
    waiting = true;                               // 쿨다운 시작
    setTimeout(() => { waiting = false; }, delay); // delay 뒤 다시 허용
  };
}
