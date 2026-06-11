import { defineConfig } from 'vite';

// 우리 인스타그램 프로젝트는 페이지가 여러 개라(로그인·피드·프로필),
// Vite에게 "이 HTML들이 각각 출발점이야"라고 알려줘요.
export default defineConfig({
  build: {
    // 압축된 코드에서도 원본 파일·줄 번호를 추적하도록 소스맵을 켜요.
    sourcemap: true,
    rollupOptions: {
      input: {
        main: 'index.html',
        feed: 'feed.html',
        profile: 'profile.html',
      },
      output: {
        // 자주 바뀌는 화면 코드와, 잘 안 바뀌는 통신 코드(api·api-error)를 갈라둬요.
        // 이렇게 묶어 두면 화면을 고쳐도 통신 덩어리는 그대로라, 받아둔 걸 다시 안 받아요(캐시 재사용).
        manualChunks(id) {
          if (id.includes('/js/api.js') || id.includes('/js/api-error.js')) {
            return 'core';
          }
        },
      },
    },
  },
});
