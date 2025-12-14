export const errorDefinitions = {
  // 1. 공통 오류 응답 구조 정의 (모든 에러가 이 구조를 따릅니다)
  ErrorResponse: {
    type: "object",
    properties: {
      resultType: { type: "string", example: "FAIL" },
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "U001" }, // 기본 예시
          reason: { type: "string", example: "에러 발생 사유입니다." },
          data: { type: "object", nullable: true },
        },
      },
      success: { type: "null", example: null },
    },
  },

  // --- 사용자 에러 (Uxxx) ---

  // 2. U001: 이미 존재하는 이메일
  DuplicateUserEmailError: {
    allOf: [{ $ref: "#/definitions/ErrorResponse" }],
    properties: {
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "U001" },
          reason: { type: "string", example: "이미 존재하는 이메일입니다." },
          data: { type: "object", nullable: true },
        },
      },
    },
  },

  // --- 미션/멤버 미션 에러 (Mxxx) ---

  // 3. M001: 이미 도전중인 멤버 미션
  MemberMissionAlreadyExistsError: {
    allOf: [{ $ref: "#/definitions/ErrorResponse" }],
    properties: {
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "M001" },
          reason: { type: "string", example: "이미 도전중입니다." },
          data: { type: "object", nullable: true },
        },
      },
    },
  },

  // 4. M002: 존재하지 않는 미션
  MissionNotFoundError: {
    allOf: [{ $ref: "#/definitions/ErrorResponse" }],
    properties: {
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "M002" },
          reason: { type: "string", example: "존재하지 않는 미션입니다." },
          data: { type: "object", nullable: true },
        },
      },
    },
  },

  // 5. M003: 존재하지 않는 회원
  MemberNotFoundError: {
    allOf: [{ $ref: "#/definitions/ErrorResponse" }],
    properties: {
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "M003" },
          reason: { type: "string", example: "존재하지 않는 회원입니다." },
          data: { type: "object", nullable: true },
        },
      },
    },
  },

  // 6. M004: 존재하지 않는 멤버 미션
  MemberMissionNotFoundError: {
    allOf: [{ $ref: "#/definitions/ErrorResponse" }],
    properties: {
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "M004" },
          reason: {
            type: "string",
            example: "존재하지 않는 member_mission입니다.",
          },
          data: { type: "object", nullable: true },
        },
      },
    },
  },

  // 7. M005: 멤버 id, 미션 id를 입력하지 않음
  MemberMissionDataInvalidError: {
    allOf: [{ $ref: "#/definitions/ErrorResponse" }],
    properties: {
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "M005" },
          reason: {
            type: "string",
            example: "member_id와 mission_id는 필수 항목입니다.",
          },
          data: { type: "object", nullable: true },
        },
      },
    },
  },

  // --- 가게 에러 (Sxxx) ---

  // 8. S001: 존재하지 않는 가게
  StoreNotFoundError: {
    allOf: [{ $ref: "#/definitions/ErrorResponse" }],
    properties: {
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "S001" },
          reason: { type: "string", example: "존재하지 않는 store입니다." },
          data: { type: "object", nullable: true },
        },
      },
    },
  },

  // --- 리뷰 에러 (Rxxx) ---

  // 9. R001: 미션이 완료/실패하지 않아 리뷰 작성 불가능
  ReviewNotAllowedError: {
    allOf: [{ $ref: "#/definitions/ErrorResponse" }],
    properties: {
      error: {
        type: "object",
        properties: {
          errorCode: { type: "string", example: "R001" },
          reason: {
            type: "string",
            example: "미션이 완료/실패한 경우에만 리뷰 작성이 가능합니다.",
          },
          data: { type: "object", nullable: true },
        },
      },
    },
  },
  // 10. 단일 미션 항목의 상세 정의
  CompletedMissionDetail: {
    type: "object",
    description: "완료된 멤버 미션의 상세 정보",
    properties: {
      id: { type: "integer", example: 12, description: "멤버 미션 ID" },
      status: { type: "string", example: "completed" },
      started_at: { type: "string", format: "date-time" },
      completed_at: { type: "string", format: "date-time" },
      mission: {
        type: "object",
        properties: {
          id: { type: "integer", example: 5, description: "미션 ID" },
          name: { type: "string", example: "친구와 방문 인증 미션" },
          store_id: { type: "integer", example: 2 },
          description: { type: "string", description: "미션 상세 설명" },
          reward: { type: "integer", example: 100 },
          criteria: { type: "string", description: "미션 성공 기준" },
          created_at: { type: "string", format: "date-time" },
          updated_at: { type: "string", format: "date-time" },
        },
      },
    },
  },
  // 11. 내가 작성한 단일 리뷰 상세 정의 (Review Detail)
  MyReviewDetail: {
    type: "object",
    properties: {
      nickname: { type: "string", example: "홍길동" },
      rating: { type: "number", example: 4 },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2025-10-15T13:07:00.000Z",
      },
      content: { type: "string", example: "새로운 미션 리뷰입니다." },
      id: { type: "integer", example: 25 },
    },
  },
};
