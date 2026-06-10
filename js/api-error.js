// instagram-clone-frontend/js/api-error.js
// E-2: API 요청이 실패했을 때 "뭐가, 왜" 실패했는지 담는 나만의 에러 클래스예요.
//      표준 Error 를 상속(extends)해서, 거기에 상태 코드·요청 주소·사용자용 메시지를 더해요.
//      (상속은 E-1 에서 PostCard → AdPostCard 로 이미 해 봤죠. 이번엔 부모가 Error 예요.)

export class ApiError extends Error {
  // statusCode: 서버가 돌려준 HTTP 상태 코드 (404, 500 …)
  // url: 어떤 요청이 실패했는지 (개발자가 추적할 때 써요)
  // userMessage: 화면(토스트)에 보여줄 사람 친화 메시지
  constructor(statusCode, url, userMessage) {
    // super 로 부모(Error)를 먼저 깨워요. 여기 넣은 문자열이 error.message 가 돼요.
    // message 는 "개발자용" — 상태 코드와 주소를 담아 콘솔에서 바로 알아보게 해요.
    super(`API ${statusCode} 응답 — ${url}`);

    this.name = "ApiError";         // 콘솔에 "ApiError: ..." 로 찍혀요 (그냥 Error 아님)
    this.statusCode = statusCode;   // 분기 처리에 써요 (예: 401 이면 다시 로그인)
    this.url = url;
    this.userMessage = userMessage; // 사용자에게 보여줄 한 줄
  }
}
