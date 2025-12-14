export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    name: body.name, //필수
    email: body.email, //필수
    gender: body.gender, //필수
    birth, //필수
    address: body.address || "", //선택
    food_category_ids: body.food_category_ids, //필수
    phone_number: body.phone_number, //필수
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
    phones: user.phones.map((phone) => phone.phoneNumber),
  };
};

// 사용자 정보 수정을 위한 DTO
export const bodyToUserUpdate = (body) => {
  // body가 undefined일 경우 빈 객체로 처리하여 안전성을 높임
  const safeBody = body || {};
  const updateData = {};

  if (safeBody.name !== undefined) updateData.name = safeBody.name;

  if (safeBody.nick_name !== undefined)
    updateData.nick_name = safeBody.nick_name;

  if (safeBody.birth !== undefined) {
    // birth가 null이거나 빈 문자열이 아니면 Date 객체로 변환
    updateData.birth = safeBody.birth ? new Date(safeBody.birth) : null;
  }

  // address는 빈 문자열로 초기화될 수 있음
  if (safeBody.address !== undefined)
    updateData.address = safeBody.address || "";

  // phone_number는 업데이트 로직이 필요하므로 따로 받습니다.
  if (safeBody.phone_number !== undefined)
    updateData.phone_number = safeBody.phone_number;

  // food_category_ids는 선호 카테고리 업데이트에 사용됩니다.
  if (safeBody.food_category_ids !== undefined)
    updateData.food_category_ids = safeBody.food_category_ids;

  return updateData;
};
