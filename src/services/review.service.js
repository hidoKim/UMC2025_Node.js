import { addReview } from "../repositories/review.repository.js";
import { getMyReviews } from "../repositories/review.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

export const writeReview = async (data) => {
  const reviewData = {
    member_mission_id: data.member_mission_id,
    parent_review_id: data.parent_review_id,
    content: data.content,
    rating: data.rating,
    images: data.images,
  };
  return await addReview(reviewData);
};

export const listMyReviews = async (memberId, cursor, size) => {
  const { reviews, nextCursor } = await getMyReviews(memberId, cursor, size);
  return responseFromReviews(reviews, nextCursor);
};
