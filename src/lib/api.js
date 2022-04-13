import axios from "axios"
import store from "../redux/store"
import { network_types } from "../redux/types"

const axiosInstance = axios.create({
    baseURL: "http://localhost:2000"
})


axiosInstance.interceptors.request.use((config) => {
    console.log(config.url)

    return config
})

axiosInstance.interceptors.response.use((res) => {
    console.log(res.data)

    return res
}, (err) => {
    store.dispatch({
        type: network_types.NETWORK_ERROR,
        payload: {
            title: "Network Error",
            description: err.message
        }
    })
})

export default axiosInstance