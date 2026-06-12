// instagram-clone-frontend/public/sw.js
// H-1: 서비스 워커 — 페이지와 네트워크 사이에 앉아 요청을 가로채는 '중간 일꾼'.
//      한 번 등록되면 페이지를 새로 고쳐도 백그라운드에서 계속 살아 있어요.
//      (public 폴더에 두면 사이트 맨 위 '/sw.js' 로 올라가, 사이트 전체를 맡을 수 있어요)

// 캐시(받아둔 파일 보관함)에 이름표를 붙여요. 새 버전을 낼 땐 v2, v3 으로 올려요.
const CACHE_NAME = "insta-cache-v1";

// 앱이 처음 뜰 때 꼭 필요한 '껍데기' — 미리 받아 캐시에 담아 둬요(precache).
// 오프라인 안내 페이지도 미리 담아 둬야, 인터넷이 끊긴 뒤에도 보여줄 수 있어요.
const APP_SHELL = ["/feed.html", "/offline.html"];

// 1) install — 설치되는 순간. 앱 껍데기를 캐시에 미리 담아요.
self.addEventListener("install", (event) => {
  // waitUntil: "이 약속(Promise)이 끝날 때까지 설치를 끝난 걸로 치지 마" 라는 뜻이에요.
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

// 2) activate — 새 버전이 깨어나는 순간. 이름표가 다른 옛 캐시는 비워요.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

// 3) fetch — 모든 네트워크 요청이 이 일꾼을 거쳐 가요. 여기서 캐시/네트워크를 정해요.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return; // 저장(POST) 같은 요청은 캐시하지 않아요

  // 페이지 이동(HTML 문서 요청)은 '네트워크 먼저' — 끊겼으면 오프라인 안내 페이지로.
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // 사진(이미지)은 '캐시 먼저' — 한 번 받은 사진은 캐시에서 바로 꺼내 써요(오프라인도 보임).
  if (request.destination === "image") {
    event.respondWith(cacheFirst(request));
    return;
  }

  // 같은 사이트의 CSS·JS 도 '캐시 먼저' — 오프라인에서도 화면 모양이 그대로 유지돼요.
  const url = new URL(request.url);
  const isSameOriginAsset =
    url.origin === self.location.origin &&
    (request.destination === "style" || request.destination === "script");
  if (isSameOriginAsset) {
    event.respondWith(cacheFirst(request));
  }
});

// 캐시 먼저: 캐시에 있으면 그걸, 없으면 네트워크에서 받아 캐시에 저장하고 돌려줘요.
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached; // 캐시에 있으면 네트워크는 건너뛰어요(빠르고, 오프라인도 OK)

  const response = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone()); // 응답은 한 번만 읽을 수 있어 복제(clone) 후 저장
  return response;
}

// 네트워크 먼저: 네트워크를 먼저 시도하고, 실패(오프라인)하면 캐시나 offline.html 로 폴백해요.
async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cached = await caches.match(request);
    return cached || (await caches.match("/offline.html"));
  }
}
