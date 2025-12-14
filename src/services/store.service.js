import {
  getAllStoreReviews,
  getStoreMissions,
} from "../repositories/store.repository.js";
import {
  responseFromReviews,
  responseFromStoreMissions,
} from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId, cursor, size) => {
  const { reviews, nextCursor } = await getAllStoreReviews(
    storeId,
    cursor,
    size
  );
  return responseFromReviews(reviews, nextCursor);
};

export const listStoreMissionsService = async (storeId) => {
  const missions = await getStoreMissions(storeId);
  return responseFromStoreMissions(missions);
};
