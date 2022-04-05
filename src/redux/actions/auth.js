import jsCookie from "js-cookie"
import api from "../../lib/api"

export const userLogin = async () => {
  const res = await axiosInstance.get("/users", {
    params: {
      username: values.username,
      // password: values.password,
    },
  });

  if (!res.data.length) {
    throw new Error("Username or password is wrong");
  }

  const userLoginData = res.data[0];
  console.log(res.data[0]);
  const stringifiedUserLoginData = JSON.stringify(userLoginData);

  jsCookie.set("user_data_login", stringifiedUserLoginData);
  console.log(jsCookie);
  // authproviderh

  dispatch({
    type: auth_types.LOGIN_USER,
    payload: userLoginData,
  });

  router.push("/");
};
