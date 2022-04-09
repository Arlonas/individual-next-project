import { content_types } from "../types";

const init_state = {
  contentList: []
};

export const content_reducer = (state = init_state, action) => {
  if (action.type === content_types.FETCH_CONTENT) {
    return {
      ...state,
      contentList: action.payload
    };
  }
  return state;
};