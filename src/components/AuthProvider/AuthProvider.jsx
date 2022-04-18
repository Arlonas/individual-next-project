import { useDispatch } from "react-redux";
import { auth_types } from "../../redux/types"; 
import { useEffect } from "react";
import jsCookie from "js-cookie";
import axiosInstance from "../../lib/api";

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(async () => {
        const userToken = jsCookie.get("auth_token")

        if(userToken) {
           const userResponse = await axiosInstance.get("/auth/refresh-token", {
               headers: {
                   authorization: userToken
               }
           })

           jsCookie.set("auth_token", userResponse.data.result.token)

            dispatch({
                type: auth_types.LOGIN_USER,
                payload: userResponse.data.result.user,
            })
        }
    }, [])

    return children
}

export default AuthProvider