import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  updateUser,
} from "../repositories/user.repository.js";
import { DuplicateUserEmailError, MemberNotFoundError } from "../errors.js";
import { prisma } from "../db.config.js";

export const userSignUp = async (data) => {
  return await prisma.$transaction(async (tx) => {
    // 1. 회원가입 (repository의 addUser 호출, tx 전달)
    // addUser 내부에서 중복 체크 후 null 반환하면 에러 처리
    const joinUserId = await addUser(data, tx);

    if (joinUserId === null) {
      throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
    }

    // 2. 선호 카테고리 등록 (반복문 + setPreference 사용)
    // 기존 함수명(setPreference)을 그대로 쓰기 위해 Promise.all 사용
    if (data.food_category_ids && data.food_category_ids.length > 0) {
      // for문 대신 병렬 처리로 성능 최적화
      await Promise.all(
        data.food_category_ids.map((category) =>
          setPreference(joinUserId, category, tx)
        )
      );
    }

    // 3. 회원 정보 조회 (tx 전달)
    // 여기서 실패하면 위 과정 모두 롤백됨
    const user = await getUser(joinUserId, tx);

    return responseFromUser({ user, preferences: user.preferences });
  });
};

// 사용자 정보 수정 서비스
export const userUpdate = async (memberId, data) => {
  // 실제 인증 미들웨어에서 memberId가 넘어오므로, 이 부분은 인증 미들웨어 구현에 따라 달라질 수 있음
  if (!memberId) {
    throw new MemberNotFoundError(
      "수정할 회원 ID(memberId)를 찾을 수 없습니다."
    );
  }

  // 1. 데이터베이스 업데이트 (트랜잭션 포함)
  await updateUser(memberId, data);

  // 2. 업데이트된 최신 사용자 정보 조회
  // getUser는 findFirstOrThrow를 사용하여 존재하지 않는 경우 에러를 던진다고 가정합니다.
  const user = await getUser(memberId);
  const preferences = await getUserPreferencesByUserId(memberId);

  // 3. 응답 DTO로 변환하여 반환
  return responseFromUser({ user, preferences });
};
