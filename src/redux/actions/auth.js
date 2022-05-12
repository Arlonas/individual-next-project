import jsCookie from "js-cookie";
import api from "../../lib/api";
import { auth_types, network_types } from "../types";

export const userLogin = (values, setSubmitting, router, setFieldError) => {
  // setSubmiting disini nerima boolena dari paramater yang dikasih formik.setsubmitting
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/signin", {
        usernameOrEmail: values.usernameOrEmail,
        password: values.password
      });

      const userSignInResponse = res.data?.result?.user
      // console.log(res.data.result)

      jsCookie.set("auth_token", res.data?.result?.token)
      
      dispatch({
        type: auth_types.LOGIN_USER,
        payload: userSignInResponse,
      });
      
      setSubmitting(false)
      router.push("/")
    } catch (err) {
      // console.log(err);
      console.log(err?.response?.data?.message)
      if (
        err?.response?.data?.message == "Wrong username or password"
      ) {
        setFieldError("usernameOrEmail", "Wrong username or password");
      }
      if (
        err?.response?.data?.message == "Wrong email or password"
      ) {
        setFieldError("usernameOrEmail", "Wrong email or password");
      }
      if (
        err?.response?.data?.message == "Wrong username or password"
      ) {
        setFieldError("password", "Wrong username or password");
      }
      if (
        err?.response?.data?.message == "Wrong email or password"
      ) {
        setFieldError("password", "Wrong email or password");
      }
      setSubmitting(false)
    }
  };
};
