import jsCookie from "js-cookie";
import api from "../../lib/api";
import { auth_types, network_types } from "../types";

export const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      const res = await api.get("/users", {
        params: {
          username: values.username,
        },
      });

      if (!res.data.length) {
        throw new Error("User not found");
      }

      if (res.data[0].password !== values.password) {
        throw new Error("Wrong password");
      }

      const userData = res.data[0];
      const stringifiedUserData = JSON.stringify(userData);

      jsCookie.set("user_data_login", stringifiedUserData);

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
