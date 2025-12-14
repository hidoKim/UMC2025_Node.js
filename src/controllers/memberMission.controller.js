import { StatusCodes } from "http-status-codes";
import { bodyToMemberMission } from "../dtos/memberMission.dto.js";
import {
  addMemberMissionService,
  completeMemberMissionService,
  listMemberMissionsByStatusService,
} from "../services/memberMission.service.js";

// 멤버 미션 추가
export const handleAddMemberMission = async (req, res, next) => {
  /*
  #swagger.summary = '멤버 미션 도전 API';
  #swagger.description = '특정 회원이 특정 미션에 도전을 시작합니다.';
  #swagger.tags = ['MemberMission'];
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["member_id", "mission_id"],
          properties: {
            member_id: { type: "integer", example: 1, description: "도전하는 회원 ID" },
            mission_id: { type: "integer", example: 3, description: "도전할 미션 ID" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "미션 도전 성공 응답",
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
                memberMissionId: { type: "integer", description: "생성된 멤버 미션 ID", example: 10 }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "미션 도전 실패 응답 (이미 도전 중, ID 없음 등)",
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/MemberMissionAlreadyExistsError"
        }
      }
    }
  }
*/
  try {
    console.log("멤버 미션 도전 요청!", req.body);
    const memberMissionId = await addMemberMissionService(
      bodyToMemberMission(req.body)
    );
    res.success({ memberMissionId });
  } catch (err) {
    next(err);
  }
};

// 진행 완료로 변경
export const handleCompleteMemberMission = async (req, res, next) => {
  /*
  #swagger.summary = '멤버 미션 완료 처리 API';
  #swagger.description = '진행 중인 멤버 미션의 상태를 "completed"로 변경합니다.';
  #swagger.tags = ['MemberMission'];
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["memberMissionId"],
          properties: {
            memberMissionId: { type: "integer", example: 10, description: "완료 처리할 멤버 미션 ID" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "미션 완료 처리 성공 응답",
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
                result: { type: "object", description: "업데이트된 멤버 미션 객체", nullable: true }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "미션 완료 처리 실패 응답 (ID 없음 등)",
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/MemberMissionDataInvalidError"
        }
      }
    }
  }
*/
  try {
    const { memberMissionId } = req.body;
    const result = await completeMemberMissionService(Number(memberMissionId));
    res.success({ result });
  } catch (err) {
    next(err);
  }
};

// 진행중 미션 목록
export const handleListInProgressMissions = async (req, res, next) => {
  /*
  #swagger.summary = '내가 진행 중인 미션 목록 조회 API';
  #swagger.description = '특정 회원이 현재 도전 중인 미션 목록을 조회합니다.';
  #swagger.tags = ['MemberMission'];
  #swagger.parameters['memberId'] = {
    in: 'query',
    description: '회원 ID',
    required: true,
    type: 'integer',
    example: 1
  }
  #swagger.responses[200] = {
    description: "진행 중 미션 목록 조회 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                missions: {
                  type: "array",
                  items: {
                    $ref: "#/definitions/CompletedMissionDetail"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "조회 실패 응답 (memberId 누락 등)",
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/MemberMissionDataInvalidError"
        }
      }
    }
  }
*/
  try {
    const { memberId } = req.query;
    const missions = await listMemberMissionsByStatusService(
      Number(memberId),
      "in_progress"
    );
    res.success({ missions });
  } catch (err) {
    next(err);
  }
};

// 완료 미션 목록
export const handleListCompletedMissions = async (req, res, next) => {
  /*
  #swagger.summary = '내가 완료한 미션 목록 조회 API';
  #swagger.description = '특정 회원이 완료/성공한 미션 목록을 조회합니다.';
  #swagger.tags = ['MemberMission'];
  #swagger.parameters['memberId'] = {
    in: 'query',
    name: 'memberId', 
    description: '회원 ID',
    required: true,
    type: 'integer',
    example: 1
  }
  #swagger.responses[200] = {
    description: "완료 미션 목록 조회 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                missions: {
                  type: "array",
                  items: {
                    $ref: "#/definitions/CompletedMissionDetail"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "조회 실패 응답 (memberId 누락 등)",
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/MemberMissionDataInvalidError"
        }
      }
    }
  }
*/
  try {
    const { memberId } = req.query;
    const missions = await listMemberMissionsByStatusService(
      Number(memberId),
      "completed"
    );
    res.success({ missions });
  } catch (err) {
    next(err);
  }
};
