// instagram-clone-frontend/js/async-advanced.js
// C-7: Promise 심화와 async/await.
// 여러 Promise를 한꺼번에 다루는 정적 메서드(all/allSettled/race/any)와,
// 비동기를 동기처럼 읽게 해주는 async/await를 익혀요.
// 이 파일도 화면(DOM)을 건드리지 않아요. 결과는 전부 콘솔(console.log)로 확인해요.

// 공통 도우미: "사진 한 장 업로드"를 흉내 내는 가짜 Promise.
// delay(밀리초) 뒤에, success가 true면 resolve, false면 reject.
// 진짜 서버 대신 setTimeout으로 "시간이 걸리는 일"을 흉내 내요.
function uploadPhoto(name, delay, success = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(`${name} 업로드 완료`);
      } else {
        reject(`${name} 업로드 실패`);
      }
    }, delay);
  });
}

// ===== C-7 Step 1. Promise.all — 여러 사진을 동시에 업로드 =====
// Promise.all([p1, p2, p3]): 배열 속 Promise를 한꺼번에 시작하고,
// 셋 다 끝나면 결과를 배열로 모아서 then으로 넘겨줘요.
// 단, 하나라도 실패(reject)하면 그 즉시 catch로 가요(나머지는 안 기다림).
function demoAll() {
  return Promise.all([
    uploadPhoto("photo1.jpg", 300),
    uploadPhoto("photo2.jpg", 500),
    uploadPhoto("photo3.jpg", 400),
  ])
    .then((results) => {
      console.log("[all] 세 장 모두 끝남:", results);
    })
    .catch((error) => {
      console.log("[all] 하나라도 실패:", error);
    });
}

// ===== C-7 Step 2. Promise.allSettled — 하나 실패해도 끝까지 =====
// allSettled: 성공·실패 상관없이 '전부 끝날 때까지' 기다려요.
// 결과는 { status: "fulfilled", value } 또는 { status: "rejected", reason }.
// 10장 중 1장이 실패해도 나머지 9장은 챙길 수 있어요.
function demoAllSettled() {
  return Promise.allSettled([
    uploadPhoto("a.jpg", 300),
    uploadPhoto("b.jpg", 400, false), // 이 한 장만 실패
    uploadPhoto("c.jpg", 500),
  ]).then((results) => {
    results.forEach((r) => {
      if (r.status === "fulfilled") {
        console.log("[allSettled] 성공:", r.value);
      } else {
        console.log("[allSettled] 실패:", r.reason);
      }
    });
  });
}

// ===== C-7 Step 3. Promise.race / Promise.any — 가장 빠른 것 / 첫 성공 =====
// race: 성공이든 실패든 '가장 먼저 끝난' 하나로 결판나요.
// any: '가장 먼저 성공한' 하나를 줘요(실패는 무시하고 성공을 기다림).
function demoRace() {
  return Promise.race([
    uploadPhoto("서버A", 500),
    uploadPhoto("서버B", 200), // 가장 빠름
    uploadPhoto("서버C", 800),
  ]).then((winner) => console.log("[race] 가장 빠른 응답:", winner));
}

function demoAny() {
  return Promise.any([
    uploadPhoto("서버A", 300, false), // 가장 빠르지만 실패 → 무시
    uploadPhoto("서버B", 500),
    uploadPhoto("서버C", 400), // 성공한 것 중 가장 빠름 → 이게 당첨
  ]).then((first) => console.log("[any] 가장 먼저 성공:", first));
}

// ===== C-7 Step 4. async/await — then 체이닝을 동기처럼 =====
// 같은 일을 두 가지 방법으로. 결과는 똑같고, 읽는 방식만 달라요.
// then 체이닝: 콜백 안으로 들어가서 이어 붙임.
function loadProfileThen() {
  return uploadPhoto("프로필", 200)
    .then((a) => {
      console.log("[then]", a);
      return uploadPhoto("피드", 200);
    })
    .then((b) => console.log("[then]", b));
}

// async/await: 함수 앞에 async, 기다릴 곳에 await.
// 위에서 아래로, 마치 동기 코드처럼 읽혀요.
async function loadProfileAsync() {
  const a = await uploadPhoto("프로필", 200);
  console.log("[await]", a);
  const b = await uploadPhoto("피드", 200);
  console.log("[await]", b);
}

// ===== C-7 Step 5. async/await 순차 처리 — await 연달아 =====
// await를 줄줄이 쓰면 '앞이 끝나야 다음'. 1초짜리 3개면 약 3초.
// 각 단계가 앞 결과에 의존할 때 어쩔 수 없이 순차로 가요.
async function uploadAllSequential() {
  console.time("순차");
  const r1 = await uploadPhoto("1번", 1000);
  console.log("[순차]", r1);
  const r2 = await uploadPhoto("2번", 1000);
  console.log("[순차]", r2);
  const r3 = await uploadPhoto("3번", 1000);
  console.log("[순차]", r3);
  console.timeEnd("순차"); // 약 3초
}

// ===== C-7 Step 6. async/await 병렬 처리 — Promise.all + await =====
// 서로 의존하지 않는 일이면 한꺼번에 시작하고 한 번만 await.
// 1초짜리 3개를 동시에 시작 → 약 1초.
async function uploadAllParallel() {
  console.time("병렬");
  const results = await Promise.all([
    uploadPhoto("1번", 1000),
    uploadPhoto("2번", 1000),
    uploadPhoto("3번", 1000),
  ]);
  console.log("[병렬]", results);
  console.timeEnd("병렬"); // 약 1초
}

// ===== C-7 Step 7. try-catch-finally — async/await 에러 처리 =====
// then은 .catch로 받았지만, async/await는 try-catch로 감싸요.
// 동기 코드의 에러 처리와 똑같은 모양이에요.
async function uploadWithCatch() {
  try {
    const result = await uploadPhoto("중요사진", 300, false); // 실패하는 업로드
    console.log("[try]", result);
  } catch (error) {
    console.log("[catch] 에러 잡음:", error);
  } finally {
    console.log("[finally] 로딩 표시 끄기");
  }
}

// ===== C-7 Step 8. 순차 vs 병렬 — 개념 정리 (코드 없음) =====
// Step 5·6의 결과가 핵심: 의존 없으면 병렬(빠름), 의존 있으면 순차(어쩔 수 없음).
// 자세한 트레이드오프는 교안의 다이어그램으로 정리해요.

// ===== C-7 Step 9. 종합 — 좋아요·댓글·공유 동시 불러오기 =====
// 서로 의존하지 않는 세 가지 데이터를 Promise.all로 동시에 받고,
// 구조 분해(C-4)로 한 번에 풀어요. 에러는 try-catch로.
function fetchLikes() {
  return new Promise((resolve) => setTimeout(() => resolve(1240), 300));
}
function fetchComments() {
  return new Promise((resolve) => setTimeout(() => resolve(["멋져요!", "최고"]), 400));
}
function fetchShares() {
  return new Promise((resolve) => setTimeout(() => resolve(58), 200));
}

async function loadPostInteractions() {
  try {
    const [likes, comments, shares] = await Promise.all([
      fetchLikes(),
      fetchComments(),
      fetchShares(),
    ]);
    console.log(`[종합] 좋아요 ${likes}개, 댓글 ${comments.length}개, 공유 ${shares}회`);
  } catch (error) {
    console.log("[종합] 불러오기 실패:", error);
  }
}

// ===== 순서대로 실행해 콘솔로 확인 =====
// 각 데모를 await로 이어 실행해서, 출력이 섞이지 않고 차례로 찍히게 해요.
async function main() {
  console.log("--- Step 1: Promise.all ---");
  await demoAll();
  console.log("--- Step 2: Promise.allSettled ---");
  await demoAllSettled();
  console.log("--- Step 3: Promise.race / any ---");
  await demoRace();
  await demoAny();
  console.log("--- Step 4: then vs async/await ---");
  await loadProfileThen();
  await loadProfileAsync();
  console.log("--- Step 5: 순차 처리 ---");
  await uploadAllSequential();
  console.log("--- Step 6: 병렬 처리 ---");
  await uploadAllParallel();
  console.log("--- Step 7: try-catch-finally ---");
  await uploadWithCatch();
  console.log("--- Step 9: 종합 ---");
  await loadPostInteractions();
}

main();
