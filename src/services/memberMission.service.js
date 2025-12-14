import { addMemberMission } from "../repositories/memberMission.repository.js";
import {
  updateMemberMissionToCompleted,
  findMemberMissionsByStatus,
} from "../repositories/memberMission.repository.js";

export const addMemberMissionService = async (data) => {
  if (!data.member_id || !data.mission_id) {
    throw new MemberMissionDataInvalidError(
      "member_id와 mission_id는 필수 항목입니다.",
      data
    );
  }

  return await addMemberMission(data);
};

export const completeMemberMissionService = async (memberMissionId) => {
  return await updateMemberMissionToCompleted(memberMissionId);
};

export const listMemberMissionsByStatusService = async (memberId, status) => {
  return await findMemberMissionsByStatus(memberId, status);
};
