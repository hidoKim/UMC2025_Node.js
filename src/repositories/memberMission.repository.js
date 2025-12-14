import { prisma } from "../db.config.js";
import {
  MemberMissionAlreadyExistsError,
  MemberNotFoundError,
  MissionNotFoundError,
} from "../errors.js";

// memberMission 추가
export const addMemberMission = async (data) => {
  return await prisma.$transaction(async (prisma) => {
    const exists = await prisma.memberMission.findFirst({
      where: {
        memberId: data.member_id,
        missionId: data.mission_id,
        is_deleted: false,
      },
    });
    if (exists) {
      throw new MemberMissionAlreadyExistsError("이미 도전중입니다.");
    }

    const missionExists = await prisma.mission.findUnique({
      where: { id: data.mission_id },
      select: { id: true },
    });
    if (!missionExists) {
      throw new MissionNotFoundError("존재하지 않는 미션입니다.");
    }

    const memberExists = await prisma.member.findUnique({
      where: { id: data.member_id },
      select: { id: true },
    });
    if (!memberExists) {
      throw new MemberNotFoundError("존재하지 않는 회원입니다.");
    }

    const created = await prisma.memberMission.create({
      data: {
        memberId: data.member_id,
        missionId: data.mission_id,
        status: "in_progress",
        started_at: new Date(),
      },
    });
    return created.id;
  });
};

export const updateMemberMissionToCompleted = async (memberMissionId) => {
  return prisma.memberMission.update({
    where: { id: memberMissionId },
    data: {
      status: "completed",
      completed_at: new Date(),
    },
  });
};

export const findMemberMissionsByStatus = async (memberId, status) => {
  return prisma.memberMission.findMany({
    where: {
      memberId,
      status,
      is_deleted: false,
    },
    include: { mission: true },
  });
};
