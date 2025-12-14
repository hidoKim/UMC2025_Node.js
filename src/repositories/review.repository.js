import { prisma } from "../db.config.js";
import {
  MemberMissionNotFoundError,
  MissionNotFoundError,
  ReviewNotAllowedError,
  StoreNotFoundError,
} from "../errors.js";

// 리뷰 작성
export const addReview = async (data) => {
  return await prisma.$transaction(async (prisma) => {
    const memberMission = await prisma.memberMission.findUnique({
      where: { id: data.member_mission_id },
      select: { missionId: true, status: true },
    });
    if (!memberMission) {
      throw new MemberMissionNotFoundError(
        "존재하지 않는 member_mission입니다."
      );
    }
    if (
      !(
        memberMission.status === "completed" ||
        memberMission.status === "failed"
      )
    ) {
      throw new ReviewNotAllowedError(
        "미션이 완료/실패한 경우에만 리뷰 작성이 가능합니다."
      );
    }

    const mission = await prisma.mission.findUnique({
      where: { id: memberMission.missionId },
      select: { store_id: true },
    });
    if (!mission) {
      throw new MissionNotFoundError("연결된 mission이 존재하지 않습니다.");
    }

    const storeExists = await prisma.store.findUnique({
      where: { id: mission.store_id },
      select: { id: true },
    });
    if (!storeExists) {
      throw new StoreNotFoundError("존재하지 않는 store입니다.");
    }

    // 리뷰 생성 및 이미지 연결
    const review = await prisma.review.create({
      data: {
        member_mission_id: data.member_mission_id,
        parent_review_id: data.parent_review_id || null,
        store_id: mission.store_id,
        content: data.content,
        rating: data.rating,
        reviewImages: {
          create: data.images?.map((src) => ({ src })) || [],
        },
      },
      include: { reviewImages: true },
    });

    return review.id;
  });
};

// 내가 쓴 리뷰 목록
export const getMyReviews = async (memberId, cursor, size = 5) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      rating: true,
      created_at: true,
      memberMission: {
        select: {
          member: {
            select: { nick_name: true },
          },
        },
      },
    },
    where: {
      is_deleted: false,
      memberMission: {
        memberId: memberId,
      },
    },
    orderBy: { id: "asc" },
    ...(cursor ? { cursor: { id: BigInt(cursor) }, skip: 1 } : {}),
    take: size,
  });

  const nextCursor = reviews.length > 0 ? reviews[reviews.length - 1].id : null;

  return { reviews, nextCursor };
};
