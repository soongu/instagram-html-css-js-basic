// instagram-clone-frontend/js/async-demo.js
// C-6: 비동기 기초와 Promise.
// 시간이 걸리는 일(setTimeout)과, 그걸 우아하게 다루는 Promise를 익혀요.
// 이 파일은 화면(DOM)을 건드리지 않아요. 결과는 전부 콘솔(console.log)로 확인해요.

// ===== C-6 Step 1. 동기 vs 비동기 — 기다림의 본질 =====
// 동기(synchronous): 위에서 아래로, 한 줄이 끝나야 다음 줄이 실행돼요.
console.log("1. 사진 고르기");
console.log("2. 필터 입히기");
console.log("3. 업로드 완료");

// 비동기(asynchronous): "시간이 걸리는 일"은 맡겨두고 다음 줄로 넘어가요.
// setTimeout(할 일, 기다릴 시간) — 두 번째 인자는 밀리초(1000 = 1초).
console.log("A. 업로드 시작");
setTimeout(() => {
  console.log("C. 업로드 끝! (2초 뒤)");
}, 2000);
console.log("B. 기다리는 동안 다른 일도 해요");
// 출력 순서: A → B → (2초 후) C. 'C'를 기다리느라 멈추지 않아요(논블로킹).

// ===== C-6 Step 2. 콜백과 콜백 지옥 =====
// 콜백(callback): 나중에 실행되라고 다른 함수에 넘기는 함수.
// 순서를 보장하려면 setTimeout 안에 또 setTimeout... 중첩이 깊어져요.
setTimeout(() => {
  console.log("1단계: 사진 업로드");
  setTimeout(() => {
    console.log("2단계: 썸네일 생성");
    setTimeout(() => {
      console.log("3단계: 팔로워에게 알림");
      // 여기서 더 깊어지면 오른쪽으로 계속 밀려나요. 이게 '콜백 지옥'.
    }, 300);
  }, 300);
}, 300);

// ===== C-6 Step 3. 이벤트 루프 — JS는 왜 안 멈추나 =====
// 동기 코드가 먼저, 그다음 Microtask(Promise), 마지막에 Task(setTimeout).
console.log("첫 번째 — 지금 바로");
setTimeout(() => console.log("네 번째 — setTimeout(Task Queue)"), 0);
// Promise는 바로 다음 Step에서 자세히. 여기선 '더 빠른 줄'이란 것만.
Promise.resolve().then(() => console.log("세 번째 — Promise(Microtask Queue)"));
console.log("두 번째 — 이것도 지금 바로");
// 출력: 첫 번째 → 두 번째 → 세 번째(Promise) → 네 번째(setTimeout)

// ===== C-6 Step 4. Promise 만들기 — 세 상태 =====
// Promise(약속): "지금은 결과가 없지만 나중에 줄게"라는 약속 상자.
// new Promise((resolve, reject) => ...) — 성공하면 resolve(값), 실패하면 reject(이유).
const uploadPromise = new Promise((resolve, reject) => {
  const ok = true; // 업로드가 성공했다고 가정
  setTimeout(() => {
    if (ok) {
      resolve("업로드 완료!"); // 성공 → fulfilled(이행) 상태로
    } else {
      reject("업로드 실패..."); // 실패 → rejected(거부) 상태로
    }
  }, 400);
});
// 만든 직후엔 아직 결과가 없어 pending(대기) 상태예요.
console.log(uploadPromise); // Promise { <pending> }

// ===== C-6 Step 5. 결과 다루기 — then / catch / finally =====
// then: 성공 값 받기 / catch: 실패 이유 받기 / finally: 성공이든 실패든 항상.
const likePromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(42), 200);
});
likePromise
  .then((count) => console.log(`좋아요 ${count}개를 받았어요`))
  .catch((error) => console.log(`문제 발생: ${error}`))
  .finally(() => console.log("성공이든 실패든, 로딩 표시는 끝"));

// ===== C-6 Step 6. Promise 체이닝 — 콜백 지옥 탈출 =====
// then이 돌려준 값이 다음 then의 입력이 돼요. 중첩 대신 아래로 곧게 흐르는 일렬.
function uploadPhoto() {
  return new Promise((resolve) => setTimeout(() => resolve("photo.jpg"), 200));
}
function makeThumbnail(file) {
  return new Promise((resolve) => setTimeout(() => resolve(`thumb-${file}`), 200));
}
function notifyFollowers(thumb) {
  return new Promise((resolve) => setTimeout(() => resolve(`알림 전송 완료: ${thumb}`), 200));
}
uploadPhoto()
  .then((file) => makeThumbnail(file)) // 1단계 결과 → 2단계 입력
  .then((thumb) => notifyFollowers(thumb)) // 2단계 결과 → 3단계 입력
  .then((result) => console.log(result)) // 최종 결과
  .catch((error) => console.log(`중간에 실패: ${error}`)); // 어디서 터져도 여기로
// Step 2에서 오른쪽으로 밀려나던 중첩이, 아래로 곧게 흐르는 체인이 됐어요.
