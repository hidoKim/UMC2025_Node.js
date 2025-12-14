import { StatusCodes } from "http-status-codes";
import { bodyToUser, bodyToUserUpdate } from "../dtos/user.dto.js";
import { userSignUp, userUpdate } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
  #swagger.summary = '회원가입 API'
  #swagger.description = '사용자 정보를 받아 회원가입을 처리하고, 가입된 사용자의 기본 정보를 반환합니다.'
  #swagger.tags = ['Auth'];
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["name", "email", "gender", "birth", "food_category_ids", "phone_number"],
          properties: {
            name: { type: "string", example: "홍길동", description: "사용자 이름" },
            email: { type: "string", format: "email", example: "user@example.com", description: "이메일 (중복 불가)" },
            gender: { type: "string", example: "male", description: "성별 (male/female)" }, 
            birth: { type: "string", format: "date", example: "1990-01-01", description: "생년월일 (YYYY-MM-DD 형식)" }, 
            address: { type: "string", example: "서울시 강남구", description: "주소 (선택)" },
            food_category_ids: { type: "array", items: { type: "integer" }, example: [1, 2], description: "선호 음식 카테고리 ID 리스트" },
            phone_number: { type: "string", example: "010-1234-5678", description: "휴대폰 번호" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "회원가입 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "null", example: null },
            success: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" },
                name: { type: "string", example: "홍길동" },
                preferCategory: { type: "array", items: { type: "string" }, example: ["한식", "중식"], description: "선호 음식 카테고리 이름" }, 
                phones: { type: "array", items: { type: "string" }, example: ["010-1234-5678"], description: "연락처 목록" } 
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "회원 가입 실패 응답 (중복 이메일, 입력값 오류 등)",  
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/DuplicateUserEmailError"
        }
      }
    }
  }
*/
  try {
    // [수정] try-catch 블록 추가
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(bodyToUser(req.body));

    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    // [수정] 에러를 next()로 전달
    next(err);
  }
};

// 사용자 정보 수정
export const handleUserUpdate = async (req, res, next) => {
  /*
  #swagger.summary = '내 정보 수정 API (PATCH /me)'
  #swagger.description = '현재 로그인된 사용자의 정보를 부분적으로 수정합니다. (인증 필요)'
  #swagger.tags = ['Auth'];
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: { type: "string", example: "새로운 이름", description: "사용자 이름 (선택)" },
            birth: { type: "string", format: "date", example: "1995-05-15", description: "생년월일 (선택)" },
            address: { type: "string", example: "서울시 강남구 역삼동", description: "주소 (선택)" },
            food_category_ids: { type: "array", items: { type: "integer" }, example: [3, 4], description: "선호 음식 카테고리 ID 리스트 (선택, 수정 시 덮어쓰기됨)" },
            phone_number: { type: "string", example: "010-9999-8888", description: "휴대폰 번호 (선택)" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "정보 수정 성공 응답 (업데이트된 사용자 정보 반환)",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "null", example: null },
            success: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" },
                name: { type: "string", example: "홍길동 수정" },
                nick_name: { type: "string", example: "닉네임변경", description: "사용자 닉네임 (선택)" },
                preferCategory: { type: "array", items: { type: "string" }, example: ["일식", "양식"], description: "선호 음식 카테고리 이름" },
                phones: { type: "array", items: { type: "string" }, example: ["010-9999-8888"], description: "연락처 목록" }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "수정 실패 응답 (회원 ID 없음, 유효성 오류 등)",
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/MemberNotFoundError" 
        }
      }
    }
  }
  */

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.error({
        errorCode: "INVALID_INPUT",
        reason: "수정할 데이터(Request Body)가 비어 있습니다.",
      });
    }

    const updatedUser = await userUpdate(
      req.user.id,
      bodyToUserUpdate(req.body)
    );

    res.status(StatusCodes.OK).success(updatedUser);
  } catch (err) {
    next(err);
  }
};
