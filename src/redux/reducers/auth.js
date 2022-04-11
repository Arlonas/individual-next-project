import { auth_types } from "../types";

const init_state = {
  id: 0,
  username: "",
  email: "",
  fullName: "",
  errorMessage: ""
};

export const auth_reducer = (state = init_state, action) => {
  if (action.type === auth_types.LOGIN_USER) {
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
      fullName: action.payload.full_name,
      id: action.payload.id,
      profilePicture: action.payload.profile_picture,
      errorMessage: ""
    };
  } else if (action.type === auth_types.LOGOUT_USER) {
    return init_state;
  } else if (action.type === auth_types.AUTH_ERROR) {
    return {
      ...state,
      errMessage: action.payload

    }
  }
  return state;
};
