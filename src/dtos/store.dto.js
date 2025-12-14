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

export const responseFromStoreMissions = (data) => ({
  missionData: data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    reward: item.reward,
    criteria: item.criteria,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  })),
});
