// instagram-clone-frontend/js/class-demo.js
// E-1: 클래스와 프로토타입.
//      객체를 "찍어내는 틀"인 class 와, 그 밑에서 돌아가는 프로토타입을 익혀요.
//      이 파일은 화면(DOM)을 건드리지 않아요. 결과는 전부 콘솔(console.log)로 확인해요.

// ===== E-1 Step 1. 왜 클래스인가 — 객체 리터럴 복붙의 한계 =====
// C-4 에서 배운 객체 리터럴로 게시물을 만들어 봐요. 게시물마다 똑같은 메서드를 또 적게 돼요.
const literalPost1 = {
  username: "jiwoo_log",
  likes: 12,
  printLikes() {
    console.log(`${this.username}의 게시물 — 좋아요 ${this.likes}개`);
  },
};

const literalPost2 = {
  username: "minjae_dev",
  likes: 47,
  printLikes() { // literalPost1 과 완전히 똑같은 코드를 복붙했어요
    console.log(`${this.username}의 게시물 — 좋아요 ${this.likes}개`);
  },
};

literalPost1.printLikes(); // jiwoo_log의 게시물 — 좋아요 12개
literalPost2.printLikes(); // minjae_dev의 게시물 — 좋아요 47개

// 똑같이 생긴 함수인데, 객체마다 따로 만들어져서 "서로 다른" 함수예요.
console.log(literalPost1.printLikes === literalPost2.printLikes); // false
// 게시물이 100개면 똑같은 함수가 메모리에 100개... 객체를 찍어낼 "틀"이 필요한 이유예요.

// ===== E-1 Step 2. class — 객체를 찍어내는 틀 =====
// class 가 틀, new 가 "틀로 하나 찍기", 찍혀 나온 객체가 인스턴스(instance)예요.
class Post {
  // constructor(생성자): new 로 찍는 순간 한 번 실행돼요. this = 지금 만들어지는 인스턴스.
  constructor(username, likes) {
    this.username = username; // 인스턴스마다 따로 갖는 데이터(필드)
    this.likes = likes;
  }

  // 메서드: 모든 인스턴스가 "함께 쓰는" 동작 (Step 7 에서 어디에 사는지 확인해요)
  like() {
    this.likes += 1;
  }

  printLikes() {
    console.log(`${this.username}의 게시물 — 좋아요 ${this.likes}개`);
  }
}

const post1 = new Post("jiwoo_log", 12);
const post2 = new Post("minjae_dev", 47);

post1.like();
post1.like();
post1.printLikes(); // jiwoo_log의 게시물 — 좋아요 14개
post2.printLikes(); // minjae_dev의 게시물 — 좋아요 47개 (post1 만 늘고 post2 는 그대로 — 인스턴스 독립)

// ===== E-1 Step 4. this 를 잃어버리는 함정 =====
// 메서드를 변수에 "떼어서" 담으면, 함수만 복사되고 주인(this)은 따라오지 않아요.
const detached = post1.printLikes;
try {
  detached(); // class 안의 코드는 자동으로 strict mode — this 가 undefined 라서 에러
} catch (error) {
  console.log("떼어서 호출 → 에러:", error.message);
}

// setTimeout(post1.printLikes, 1000) 도 똑같이 터져요.
// setTimeout 은 받은 함수를 나중에 "그냥 함수로" 부르거든요 — 아래 흉내처럼요.
function callLikeSetTimeout(callback) {
  try {
    callback(); // 주인 없이 호출 → this 가 사라져요
  } catch (error) {
    console.log("setTimeout 흉내 → 에러:", error.message);
  }
}
callLikeSetTimeout(post1.printLikes);

// ===== E-1 Step 5. 해법 셋 — bind · 화살표 필드 · call/apply =====

// 해법 ① bind — this 를 영구 접착한 "새 함수"를 만들어 돌려줘요.
const boundPrint = post1.printLikes.bind(post1);
boundPrint(); // 떼어내 불러도 OK — this 가 post1 로 고정
setTimeout(post1.printLikes.bind(post1), 100); // setTimeout 도 안전 (이 파일 출력의 맨 끝에 나와요)

// 해법 ② 클래스 필드 + 화살표 함수 — 화살표 함수는 자기 this 가 없어서,
// 만들어질 때 감싸고 있던 this(= 인스턴스)를 그대로 기억해요.
class Story {
  constructor(username) {
    this.username = username;
    this.views = 0;
  }

  // 필드에 화살표 함수를 담으면, 인스턴스마다 this 가 고정된 함수가 생겨요.
  addView = () => {
    this.views += 1;
    console.log(`${this.username}의 스토리 — 조회수 ${this.views}`);
  };
}

const story = new Story("soohyun_k");
const detachedAddView = story.addView;
detachedAddView(); // 떼어내도 OK — soohyun_k의 스토리 — 조회수 1
detachedAddView(); // 조회수 2

// 해법 ③ call / apply — this 를 "이번 한 번만" 지정해서 즉시 호출해요.
function introduce(role, mark) {
  console.log(`${mark} ${this.username} — ${role}`);
}
introduce.call(post1, "오늘의 인기 게시물", "[인기]");  // 인자를 낱개로 전달
introduce.apply(post2, ["오늘의 새 게시물", "[NEW]"]); // 인자를 배열 하나로 전달
// 둘 다 "this 를 지정해 즉시 호출"은 같고, 인자 전달 방식만 달라요.
// 다른 객체에게 메서드를 빌려줄 수도 있어요:
post1.printLikes.call({ username: "ad_official", likes: 999 }); // ad_official의 게시물 — 좋아요 999개

// ===== E-1 Step 7. 프로토타입 체인 — 클래스 밑의 진짜 구조 =====
// Step 1 의 복붙 객체와 달리, 클래스의 메서드는 프로토타입에 "한 번만" 있어요.
console.log(post1.like === post2.like); // true — 두 인스턴스가 같은 함수를 공유해요
console.log(Object.getPrototypeOf(post1) === Post.prototype); // true — 인스턴스의 숨은 부모가 Post.prototype

// instanceof: "이 객체, 이 틀로 찍었나요?" — 체인을 거슬러 올라가며 확인해요.
console.log(post1 instanceof Post);   // true
console.log(post1 instanceof Object); // true — 체인 끝에 Object.prototype 이 있어서
console.log(story instanceof Post);   // false — Story 로 찍은 인스턴스니까

// 체인 거슬러 오르기: post1 → Post.prototype → Object.prototype → null(끝)
const firstStop = Object.getPrototypeOf(post1);      // Post.prototype
const secondStop = Object.getPrototypeOf(firstStop); // Object.prototype
console.log(secondStop === Object.prototype); // true
console.log(Object.getPrototypeOf(secondStop)); // null — 체인의 끝

// ===== E-1 Step 9. Symbol 맛보기 — 절대 겹치지 않는 이름표 =====
// Symbol(): 부를 때마다 세상에 하나뿐인 값을 만들어요. 설명이 같아도 서로 달라요.
console.log(Symbol("id") === Symbol("id")); // false

// 객체 키로 쓰면 "숨은 키"가 돼요 — 변수에 담은 심볼을 대괄호로 감싸 키로 써요.
const AD_ID = Symbol("id");
const adPost = {
  username: "ad_official",
  [AD_ID]: "ad-2026-0001",
};

console.log(adPost[AD_ID]); // ad-2026-0001 — 그 심볼을 가진 코드만 접근할 수 있어요
// 평범한 순회·직렬화에는 안 보여요 (라이브러리가 내부 데이터를 살짝 숨겨 둘 때 쓰는 방식).
for (const key in adPost) {
  console.log("for...in 에 보이는 키:", key); // username 만 나와요
}
console.log(JSON.stringify(adPost)); // {"username":"ad_official"} — 심볼 키는 JSON 에도 안 실려요

// ===== E-2 Step 2. 표준 Error 객체 톺아보기 =====
// 커스텀 에러를 만들기 전에, JavaScript 가 기본으로 주는 Error 부터 뜯어봐요.
// Error 는 그냥 "에러 정보를 담은 객체"예요. new 로 만들 수 있어요(아직 던지진 않았어요).
const basicError = new Error("무언가 잘못됐어요");
console.log("name:", basicError.name);       // "Error" — 에러의 종류 이름
console.log("message:", basicError.message); // "무언가 잘못됐어요" — 우리가 넣은 설명
console.log("stack:", basicError.stack);     // 어디서 났는지 추적 (형식은 환경마다 달라요)

// 종류별 에러도 다 Error 의 자식이에요 — name 만 다르고 구조는 같아요.
const typeError = new TypeError("숫자가 와야 하는데 글자가 왔어요");
console.log(typeError.name);                 // "TypeError"
console.log(typeError instanceof Error);     // true — TypeError 도 결국 Error

// ES2022: cause — "이 에러를 일으킨 진짜 원인"을 체인으로 매달아요.
// 바깥 에러는 사람이 읽을 메시지, cause 는 디버깅용 원본 에러를 품어요.
try {
  try {
    JSON.parse("{ 깨진 JSON }"); // 여기서 SyntaxError 가 나요
  } catch (parseError) {
    // 원본(parseError)을 cause 로 감싸 다시 던져요.
    throw new Error("프로필을 불러오지 못했어요", { cause: parseError });
  }
} catch (error) {
  console.log("바깥 메시지:", error.message);        // 프로필을 불러오지 못했어요
  console.log("원인(cause):", error.cause.name);     // "SyntaxError" — 진짜 원인이 남아 있어요
}
