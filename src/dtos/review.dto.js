// 리뷰작성
export const bodyToReview = (body) => {
  if (!body.member_mission_id || !body.content || !body.rating) {
    throw new Error("member_mission_id, content, rating은 필수입니다.");
  }

  return {
    member_mission_id: body.member_mission_id,
    parent_review_id: body.parent_review_id || null,
    content: body.content,
    rating: body.rating,
    images: Array.isArray(body.images) ? body.images : [],
  };
};

export const responseFromReviews = (data, cursorId) => {
  return {
    reviewData: data.map((item) => ({
      nickname: item.memberMission.member.nick_name,
      rating: item.rating,
      createdAt: item.created_at,
      content: item.content,
      id: item.id, // 다음 커서용 id
    })),
    cursorId: cursorId || null,
  };
};
