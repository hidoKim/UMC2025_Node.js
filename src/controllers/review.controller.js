import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { writeReview } from "../services/review.service.js";
import { listMyReviews } from "../services/review.service.js";

export const handleReview = async (req, res, next) => {
  /*
  #swagger.summary = '리뷰 작성 API';
  #swagger.description = '사용자가 미션을 완료/실패한 후, 해당 미션에 대한 리뷰를 작성합니다.';
  #swagger.tags = ['Review'];
  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["member_mission_id", "content", "rating"],
          properties: {
            member_mission_id: { type: "integer", example: 1, description: "리뷰를 작성할 멤버 미션 ID" },
            content: { type: "string", example: "깔끔하고 친절해요.", description: "리뷰 내용" },
            rating: { type: "number", example: 4.5, description: "별점 (1.0~5.0)" },
            parent_review_id: { type: "integer", nullable: true, example: null, description: "댓글인 경우 부모 리뷰 ID (선택)" },
            images: { type: "array", items: { type: "string" }, example: ["/image/1.jpg", "/image/2.jpg"], description: "리뷰 이미지 URL 목록 (선택)" }
          }
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: "리뷰 작성 성공 응답",
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
                result: { type: "integer", description: "작성된 리뷰 ID", example: 17 }
              }
            }
          }
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: "리뷰 작성 실패 응답 (유효성 오류, 미션 상태 오류 등)",
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/ReviewNotAllowedError"
        }
      }
    }
  }
*/
  try {
    console.log("리뷰작성을 요청했습니다!");
    console.log("body: ", req.body);

    const reviewId = await writeReview(bodyToReview(req.body));
    res.success({ result: reviewId });
  } catch (err) {
    next(err);
  }
};

export const handleListMyReviews = async (req, res, next) => {
  /*
  #swagger.summary = '내가 작성한 리뷰 목록 조회 API';
  #swagger.description = '로그인된 사용자(또는 쿼리로 memberId 지정)가 작성한 리뷰 목록을 커서 기반으로 조회합니다.';
  #swagger.tags = ['Review'];
  #swagger.parameters['memberId'] = { 
    in: 'query',
    name: 'memberId',
    description: '회원 ID (인증 미구현 시 사용)',
    required: false,
    type: 'integer',
    example: 1
  }
  #swagger.parameters['cursor'] = {
    in: 'query',
    name: 'cursor',
    description: '커서 (기본값 0)',
    required: false,
    type: 'integer',
    example: 0
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
    description: "내가 작성한 리뷰 목록 조회 성공 응답",
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
                  type: "array",
                  items: {
                    $ref: "#/definitions/MyReviewDetail"
                  }
                },
                cursorId: { type: "integer", nullable: true, example: 30 }
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
          $ref: "#/definitions/MemberNotFoundError"
        }
      }
    }
  }
*/
  try {
    const memberId = req.user?.id || parseInt(req.query.memberId); // 인증 미구현 시 쿼리로 받음
    const { cursor, size } = req.query;
    const cursorValue = cursor ? parseInt(cursor) : 0;
    const pageSize = Number(size) || 5;

    if (!memberId) {
      return res.error({
        errorCode: "MISSING_MEMBER_ID",
        reason: "memberId가 필요합니다.",
        data: null,
      });
    }

    const reviews = await listMyReviews(memberId, cursorValue, pageSize);
    res.success({ reviews });
  } catch (err) {
    next(err);
  }
};
