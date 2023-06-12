import axios from "axios";
import {base_url} from "../config/config";

const instance = axios.create({
    baseURL: "http://172.30.125.92:8071",});

instance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, err => {
    return Promise.reject(err);
})

instance.interceptors.response.use(
    resp => {
        if (resp.status === 404) {
            console.log(resp.status +"error occur");
        }

        return resp;
    }, async err => {
        if (err.response?.status === 401) {
            console.log('token refresh is required');
        }
        return err;
    }
)

export default instance;