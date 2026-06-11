// instagram-clone-frontend/js/post-card.js
// E-1: 게시물 카드 한 채를 책임지는 클래스.
//      feed.js 의 renderPost 함수가 하던 일을 PostCard 클래스로 옮겼어요.
//      데이터(post)는 constructor 로 받아 두고, render() 가 <article> 을 만들어 돌려줘요.

export class PostCard {
  constructor(post, options = {}) {
    this.post = post; // 게시물 데이터(객체)를 인스턴스에 담아 둬요
    // priority: true 면 "가장 큰 첫 사진(LCP)" — 미루지 말고 먼저 받아 와요
    this.priority = options.priority ?? false;
  }

  // <article> 한 채를 만들어 돌려줘요 — 예전 renderPost(post) 와 화면 모습이 똑같아요.
  render() {
    const article = document.createElement("article");
    article.dataset.postId = this.post.id; // 어느 게시물인지 기억해 둬요 (댓글 POST 에 필요)
    article.innerHTML = this.buildTemplate();
    return article;
  }

  // 카드 안쪽 마크업 — renderPost 시절의 템플릿을 그대로 옮겨 왔어요.
  buildTemplate() {
    const post = this.post;
    return `
    <header class="post-header">
      <a class="post-user" href="profile.html">
        <img class="post-avatar" src="${post.avatar}" alt="${post.username} 프로필 사진" width="32" height="32">
        <strong class="post-author">${post.username}</strong>
      </a>
      <time class="post-time">${post.time}</time>
      <button type="button" class="post-more" popovertarget="postMenu" aria-label="더보기">
        <svg class="ico" aria-hidden="true"><use href="assets/icons.svg#ico-dots"></use></svg></button>
    </header>
    <figure class="post-photo">
      <picture>
        <source type="image/webp" srcset="${post.image}.webp">
        <img src="${post.image}.jpg" alt="${post.alt}" width="600" height="600"
             ${this.priority ? 'fetchpriority="high"' : 'loading="lazy"'}>
      </picture>
    </figure>
    <div class="post-actions">
      <button type="button" class="icon-btn icon-btn-like" aria-label="좋아요" aria-pressed="false">
        <svg class="ico" aria-hidden="true"><use href="assets/icons.svg#ico-heart"></use></svg></button>
      <button type="button" class="icon-btn" aria-label="댓글">
        <svg class="ico" aria-hidden="true"><use href="assets/icons.svg#ico-comment"></use></svg></button>
      <button type="button" class="icon-btn icon-btn-share" command="show-modal" commandfor="shareDialog" aria-label="공유">
        <svg class="ico" aria-hidden="true"><use href="assets/icons.svg#ico-share"></use></svg></button>
      <button type="button" class="icon-btn icon-btn-save" aria-label="저장">
        <svg class="ico" aria-hidden="true"><use href="assets/icons.svg#ico-save"></use></svg></button>
    </div>
    <p class="post-likes" aria-live="polite" aria-atomic="true">좋아요 <strong>${post.likes.toLocaleString()}</strong>개</p>
    <p class="post-caption"><strong>${post.username}</strong> ${post.caption}</p>
    <p class="post-comments"><a href="#comments">댓글 ${post.commentCount}개 모두 보기</a></p>
    <ul class="comment-list" aria-live="polite"></ul>
    <form class="comment-form">
      <textarea class="comment-input" rows="1" placeholder="댓글 달기..." aria-label="댓글 입력"></textarea>
      <button type="button" class="comment-emoji" aria-label="이모지 넣기">😊</button>
      <button type="submit">게시</button>
    </form>
  `;
  }
}

// 광고 게시물 카드 — PostCard 를 상속(extends)받아 "광고 표식"만 더해요.
export class AdPostCard extends PostCard {
  constructor(post) {
    super(post); // 부모(PostCard)의 constructor 를 먼저 불러요 — 데이터 보관은 부모가 해 줘요
  }

  // render() 오버라이드 — 카드 본체는 부모(super)가 만들고, 광고 표식만 얹어요.
  render() {
    const article = super.render();   // 1) 부모의 render() 로 카드 한 채를 만들고
    article.classList.add("post-ad"); // 2) 광고 카드라는 클래스를 달고
    const badge = document.createElement("span");
    badge.className = "ad-badge";
    badge.textContent = "광고";
    article.querySelector(".post-time").replaceWith(badge); // 3) 시간 자리에 "광고" 라벨
    return article;
  }
}
