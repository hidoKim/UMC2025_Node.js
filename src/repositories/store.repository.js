import { prisma } from "../db.config.js";

// 커서 기반 페이지네이션 적용
export const getAllStoreReviews = async (storeId, cursor, size = 5) => {
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
        mission: { store_id: parseInt(storeId) },
      },
    },
    // 커서 id보다 큰 값들만, 일정 개수만 조회
    orderBy: { id: "asc" },
    ...(cursor ? { cursor: { id: BigInt(cursor) }, skip: 1 } : {}),
    take: size,
  });

  // 마지막 리뷰 id를 커서로 제공 - DTO가 아닌 repository에서 커서를 반환한 이유는 담당하는 위치(책임)을 명확하게 하기 위함
  const nextCursor = reviews.length > 0 ? reviews[reviews.length - 1].id : null;
  return { reviews, nextCursor };
};

export const getStoreMissions = async (storeId) => {
  return await prisma.mission.findMany({
    where: {
      store_id: storeId,
      is_deleted: false,
    },
    orderBy: { id: "asc" }, // 필요시 추가
  });
};
