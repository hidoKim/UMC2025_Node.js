export const bodyToMission = (body) => {
  return {
    store_id: body.store_id,
    name: body.name,
    description: body.description,
    reward: body.reward,
    criteria: body.criteria,
  };
};
