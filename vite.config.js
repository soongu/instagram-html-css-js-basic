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
    },
  },
});
