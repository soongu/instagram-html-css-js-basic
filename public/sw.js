// instagram-clone-frontend/public/sw.js
// H-1: 서비스 워커 — 페이지와 네트워크 사이에 앉아 요청을 가로채는 '중간 일꾼'.
//      한 번 등록되면 페이지를 새로 고쳐도 백그라운드에서 계속 살아 있어요.
//      (public 폴더에 두면 사이트 맨 위 '/sw.js' 로 올라가, 사이트 전체를 맡을 수 있어요)

// 1) install — 서비스 워커가 설치되는 순간 딱 한 번 깨어나요.
self.addEventListener("install", (event) => {
  console.log("[SW] 설치됨");
});

// 2) activate — 새 버전이 깨어나 페이지를 맡기 시작하는 순간.
self.addEventListener("activate", (event) => {
  console.log("[SW] 활성화됨");
});

// 3) fetch — 페이지가 보내는 '모든' 네트워크 요청이 이 일꾼을 거쳐 가요.
//    아직은 가로채지 않고 그대로 네트워크로 흘려보내요(다음 단계에서 캐시를 더해요).
self.addEventListener("fetch", (event) => {
  // event.respondWith(...) 를 부르지 않으면 브라우저가 평소대로 네트워크로 가요.
});
