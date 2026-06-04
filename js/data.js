// instagram-clone-frontend/js/data.js
// C-5: 피드 데이터를 main.js 에서 떼어낸 파일. 데이터만 모아둬요.
// 다른 파일에서 import 해서 쓰도록 export 를 붙여요.

export const feedPosts = [
  {
    id: 1,
    caption: "제주 여행 다녀왔어요",
    likeCount: 120,
    author: { name: "minji", verified: true },
    location: "제주도"
  },
  {
    id: 2,
    caption: "오늘의 맛집 발견",
    likeCount: 0, // 아직 아무도 안 누른 새 게시물
    author: { name: "jaehoon" } // location 이 없어요
  },
  {
    id: 3,
    caption: "평범한 일상",
    likeCount: 56 // author 가 통째로 없어요 → 익명
  },
  {
    id: 4,
    caption: "발리 서핑 도전",
    likeCount: 340,
    author: { name: "yuna", verified: false },
    location: "발리"
  }
];
