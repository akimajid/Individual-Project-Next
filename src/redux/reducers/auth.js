import { auth_types } from "../types";

const init_state = {
  id: 0,
  username: "",
  email: "",
  full_name: "",
  profile_picture: "",
  bio: "",
  errorMsg: "",
};

export const auth_reducer = (state = init_state, action) => {
  if (action.type === auth_types.LOGIN_USER) {
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
      full_name: action.payload.full_name,
      profile_picture: action.payload.profile_picture,
      bio: action.payload.bio,
      id: action.payload.id,
    };
  } else if (action.type === auth_types.LOGOUT_USER) {
    return init_state;
  } else if (action.type === auth_types.AUTH_ERROR) {
    return {
      ...state,
      errorMsg: action.payload,
    };
  } else if (action.type === auth_types.EDIT_USER) {
    return {
      ...state,
      username: action.payload.username,
      full_name: action.payload.full_name,
      profile_picture: action.payload.profile_picture,
      bio: action.payload.bio,
      id: action.payload.id,
      is_verified: action.payload.is_verified,
    };
  }

  return state;
};
