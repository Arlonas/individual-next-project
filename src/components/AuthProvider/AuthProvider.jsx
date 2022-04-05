import { useDispatch } from "react-redux";
import { auth_types } from "../../redux/types"; 
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";

const AuthProvider = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const savedUserLoginData = jsCookie.get("user_data_login")

        if(savedUserLoginData) {
            const parsedUserData = JSON.parse(savedUserLoginData)

            dispatch({
                type: auth_types.LOGIN_USER,
                payload: parsedUserData,
            })
        }
    }, [])

    return children
}

export default AuthProvider