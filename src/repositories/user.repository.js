// import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data, tx) => {
  const db = tx || prisma; // tx가 있으면 tx 사용, 없으면 기본 prisma 사용

  const user = await db.member.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await db.member.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      phones: {
        create: { phoneNumber: data.phone_number },
      },
    },
  });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (memberId, tx) => {
  const db = tx || prisma;

  const user = await db.member.findFirstOrThrow({
    where: { id: memberId },
    include: {
      phones: true,
      preferences: {
        include: { foodCategory: true },
      },
    },
  });

  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (memberId, foodCategoryId, tx) => {
  const db = tx || prisma;

  await db.memberPrefFood.create({
    data: {
      memberId: memberId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (memberId, tx) => {
  const db = tx || prisma;

  const preferences = await db.memberPrefFood.findMany({
    where: { memberId },
    include: { foodCategory: true },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

// 사용자 정보 및 선호 카테고리 수정
export const updateUser = async (memberId, data) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Member 테이블 업데이트에 필요한 데이터 준비
    const userUpdateData = {
      name: data.name,
      birth: data.birth,
      address: data.address,
      nick_name: data.nick_name,
    };

    // null/undefined가 아닌 값만 필터링 (PATCH 요청의 특성)
    const filteredUpdateData = Object.fromEntries(
      Object.entries(userUpdateData).filter(([_, v]) => v !== undefined)
    );

    // Member 테이블 업데이트 실행
    await tx.member.update({
      where: { id: memberId },
      data: filteredUpdateData,
    });

    // 2. 휴대폰 번호 업데이트 (phones 테이블에 첫 번째 번호만 있다고 가정)
    if (data.phone_number !== undefined) {
      // updateMany를 사용하여 해당 memberId의 모든 전화번호를 업데이트
      await tx.phone.updateMany({
        where: { memberId: memberId },
        data: { phoneNumber: data.phone_number },
      });
    }

    // 3. 선호 카테고리 업데이트 (기존 삭제 후 재삽입)
    if (
      data.food_category_ids !== undefined &&
      Array.isArray(data.food_category_ids)
    ) {
      // 기존 선호 카테고리 모두 삭제
      await tx.memberPrefFood.deleteMany({
        where: { memberId: memberId },
      });

      // 새로운 선호 카테고리 삽입
      if (data.food_category_ids.length > 0) {
        const preferenceInserts = data.food_category_ids.map(
          (foodCategoryId) => ({
            memberId: memberId,
            foodCategoryId: foodCategoryId,
          })
        );
        await tx.memberPrefFood.createMany({
          data: preferenceInserts,
        });
      }
    }

    return memberId;
  });
};
