import jsCookie from "js-cookie";
import api from "../../lib/api";
import { auth_types, network_types } from "../types";

export const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/signin", {
        username: values.username,
        password: values.password
      });

      const userSignInResponse = res.data.result

      jsCookie.set("auth_token", userSignInResponse)
      
      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userData,
      });
      
      setSubmitting(false)
    } catch (err) {
      console.log(err);

      dispatch({
        type: network_types.NETWORK_ERROR,
        payload: {
          title: "Login Failed",
          description: err.message
        }
      })

      setSubmitting(false)
    }
  };
};
