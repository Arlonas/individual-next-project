import { content_types } from "../types";

const init_state = {
  contentList: [],
  contentCount: 0,
};

export const content_reducer = (state = init_state, action) => {
  if (action.type === content_types.FETCH_CONTENT) {
    return {
      ...state,
      contentList: action.payload.contentList,
      contentCount: action.payload.contentCount,
    };
  } else if (action.type === content_types.FETCH_NEXT_CONTENT) {
    // console.log(state.contentList)
    return {
      ...state,
      contentCount: action.payload.contentCount,
      contentList: [...state.contentList, ...action.payload.contentList],
    };
  } else if (action.type === content_types.FETCH_ALL_CONTENT) {
    return {
      ...state,
      contentList: action.payload,
    };
  } else if (action.type === content_types.DELETE_CONTENT) {
    const deleteContentArr = [...state.contentList];
    deleteContentArr.splice(action.payload, 1);

    return {
      ...state,
      contentList: deleteContentArr,
    };
  }
  return state;
};
