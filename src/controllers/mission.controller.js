import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMissionService } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  /*
  #swagger.summary = '미션 추가 API';
  #swagger.description = '새로운 미션을 상점에 등록합니다. (관리자 권한 필요)';
  #swagger.tags = ['Mission'];
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["store_id", "name", "description", "reward", "criteria"],
          properties: {
            store_id: { type: "integer", example: 1, description: "미션을 등록할 상점 ID" },
            name: { type: "string", example: "첫 방문 인증샷 미션", description: "미션 이름" },
            description: { type: "string", example: "가게 내부 사진을 찍고 후기를 남겨주세요.", description: "미션 설명" },
            reward: { type: "integer", example: 100, description: "미션 성공 시 지급되는 보상 (포인트 등)" },
            criteria: { type: "string", example: "사진 업로드 및 후기 작성", description: "미션 성공 기준" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "미션 추가 성공 응답",
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
                result: { type: "integer", description: "작성된 미션 ID", example: 5 }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "미션 추가 실패 응답 (입력값 오류, 상점 없음 등)",
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/StoreNotFoundError"
        }
      }
    }
  }
*/
  try {
    console.log("미션 추가를 요청했습니다!");
    console.log("body: ", req.body);
    const missionId = await addMissionService(bodyToMission(req.body));
    res.success({ result: missionId });
  } catch (err) {
    next(err);
  }
};
