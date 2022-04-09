import api from "../../lib/api";
import { content_types } from "../types";

export const fetchContent = () => {
  return async (dispatch) => {
    try {
      const res = await api.get("/posts", {
        params: {
          _expand: "user",
        },
      });
      // kalo mau like bikin like dislike di tablenya pake boolean
      // res.data.result kalo mau ambil data dari backend
      const contentList = res.data
      dispatch({
        type: content_types.FETCH_CONTENT,
        payload: contentList
      })
    } catch (err) {
      console.log(err);
      // err.response.data.message kalo mo nerima message error dari backend
      // pake network message wrapper gitu trs interceptor masuk ke situ
    }
  };
};
