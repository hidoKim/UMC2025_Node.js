import { StatusCodes } from "http-status-codes";
import {
  listStoreReviews,
  listStoreMissionsService,
} from "../services/store.service.js";

export const handleListStoreReviews = async (req, res, next) => {
  /*
  #swagger.summary = '상점 리뷰 목록 조회 API';
  #swagger.description = '특정 상점의 리뷰 목록을 최신순으로 커서 기반 페이지네이션을 통해 조회합니다.';
  #swagger.tags = ['Store'];
  #swagger.parameters['storeId'] = {  
    in: 'path',
    name: 'storeId',
    description: '상점 ID',
    required: true,
    type: 'integer',
    example: 1
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    name: 'cursor',
    description: '이전에 조회된 마지막 리뷰의 ID (다음 페이지 커서, 기본값 0)',
    required: false,
    type: 'integer',
    example: 17
  }
  #swagger.parameters['size'] = {
    in: 'query',
    name: 'size',
    description: '가져올 리뷰 개수 (기본값 5)',
    required: false,
    type: 'integer',
    example: 5
  }
  #swagger.responses[200] = {
    description: "상점 리뷰 목록 조회 성공 응답",
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
                reviews: {
                  type: "object",
                  properties: {
                    reviewData: {
                      type: "array",
                      items: {
                        $ref: "#/definitions/MyReviewDetail"
                      }
                    },
                    cursorId: { type: "integer", nullable: true, example: 30 }
                  }
                },
              }
            }
          }
        }
      }
    }
  };
  #swagger.responses[400] = { 
    description: "상점 리뷰 목록 조회 실패 응답",
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/StoreNotFoundError"
        }
      }
    }
  }
*/
  const { cursor, size } = req.query;
  // 커서가 없을 때 0으로 처리 (문자/숫자 모두 대응)
  const cursorValue =
    typeof cursor === "string"
      ? parseInt(cursor)
      : cursor === undefined || cursor === null
      ? 0
      : cursor;
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      cursorValue,
      Number(size) || 5
    );
    res.success({ reviews });
  } catch (err) {
    next(err);
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  /*
  #swagger.summary = '상점 미션 목록 조회 API';
  #swagger.description = '특정 상점에 등록된 활성화된 미션 목록을 조회합니다.';
  #swagger.tags = ['Store'];
  #swagger.parameters['storeId'] = { 
    in: 'path',
    name: 'storeId',
    description: '상점 ID',
    required: true,
    type: 'integer',
    example: 1
  }
  #swagger.responses[200] = {
    description: "상점 미션 목록 조회 성공 응답",
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
                  type: "object",
                  properties: {
                    missionData: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "integer", example: 3 },
                          name: { type: "string", example: "첫 방문 인증샷 미션" },
                          description: { type: "string", example: "가게 내부 사진을 찍고 후기를 남겨주세요." },
                          reward: { type: "integer", example: 100 },
                          criteria: { type: "string", example: "사진 업로드 및 후기 작성" },
                          createdAt: { type: "string", format: "date-time" },
                          updatedAt: { type: "string", format: "date-time" }
                        }
                      }
                    }
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
    description: "상점 미션 목록 조회 실패 응답",
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
    const storeId = Number(req.params.storeId);
    const missions = await listStoreMissionsService(storeId);
    res.success({ missions });
  } catch (err) {
    next(err);
  }
};
