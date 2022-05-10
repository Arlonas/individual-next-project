import axios from "axios"
import jsCookie from "js-cookie"
import store from "../redux/store"
import { auth_types, network_types } from "../redux/types"

const axiosInstance = axios.create({
    baseURL: "http://localhost:2020"
})


axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = jsCookie.get("auth_token") || ""

    return config
})

axiosInstance.interceptors.response.use((res) => {
    // console.log(res.data)

    return res
}, 
(err) => {
    if(err?.response?.status == 419) {
        jsCookie.remove("auth_token")

        store.dispatch({
            type: auth_types.LOGOUT_USER
        })
    }

    return Promise.reject(err)
}
)

export default axiosInstance