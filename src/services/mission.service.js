import { MissionDataInvalidError } from "../errors.js";
import { addMission } from "../repositories/mission.repository.js";

export const addMissionService = async (data) => {
  // 데이터 검증
  if (
    !data.store_id ||
    !data.name ||
    !data.description ||
    !data.reward ||
    !data.criteria
  ) {
    throw new MissionDataInvalidError(
      "store_id, name, description, reward, criteria는 필수입니다.",
      data
    );
  }

  // 검증 통과 시 Repository 호출
  return await addMission(data);
};
