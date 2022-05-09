import api from "../../lib/api";
import { content_types, network_types } from "../types";

export const fetchInitialContent = (page) => {
  return async (dispatch) => {
    try {
      const res = await api.get("/post", {
        params: {
          _limit: 5,
          _page: 1,
          _sortBy: "createdAt",
          _sortDir: "DESC",
        },
      });
      // kalo mau like bikin like dislike di tablenya pake boolean
      // res.data.result kalo mau ambil data dari backend
      const contentList = res?.data?.result?.rows;
      const contentCount = res?.data?.result?.count;
      // console.log(contentList)
      dispatch({
        type: content_types.FETCH_CONTENT,
        payload: {
          contentList,
          contentCount,
        },
      });
    } catch (err) {
      console.log(err);
      // err.response.data.message kalo mo nerima message error dari backend
      // pake network message wrapper gitu trs interceptor masuk ke situ
      dispatch({
        type: network_types.NETWORK_ERROR,
        payload: {
          title: "Fetch Posts Failed",
          description: err?.response?.data?.message,
        },
      });
    }
  };
};
