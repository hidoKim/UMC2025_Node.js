//이미 존재하는 이메일
export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 이미 도전중인 멤버 미션
export class MemberMissionAlreadyExistsError extends Error {
  errorCode = "M001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 존재하지 않는 미션
export class MissionNotFoundError extends Error {
  errorCode = "M002";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 존재하지 않는 회원
export class MemberNotFoundError extends Error {
  errorCode = "M003";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 존재하지 않는 멤버 미션
export class MemberMissionNotFoundError extends Error {
  errorCode = "M004";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 멤버 id, 미션 id를 입력하지 않음
export class MemberMissionDataInvalidError extends Error {
  errorCode = "M005";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션 생성 데이터(필수 값) 누락
export class MissionDataInvalidError extends Error {
  errorCode = "M006";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
// 존재하지 않는 가게
export class StoreNotFoundError extends Error {
  errorCode = "S001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

// 미션이 완료/실패하지 않아 리뷰 작성 불가능
export class ReviewNotAllowedError extends Error {
  errorCode = "R001";
  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
