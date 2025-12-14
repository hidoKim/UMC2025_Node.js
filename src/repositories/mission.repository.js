import { prisma } from "../db.config.js";
import { StoreNotFoundError } from "../errors.js";

// mission 추가
export const addMission = async (data) => {
  return await prisma.$transaction(async (prisma) => {
    const storeExists = await prisma.store.findUnique({
      where: { id: data.store_id },
      select: { id: true },
    });
    if (!storeExists) {
      throw new StoreNotFoundError("존재하지 않는 store입니다.");
    }

    const created = await prisma.mission.create({
      data: {
        store_id: data.store_id,
        name: data.name,
        description: data.description,
        reward: data.reward,
        criteria: data.criteria,
      },
    });
    return created.id;
  });
};
