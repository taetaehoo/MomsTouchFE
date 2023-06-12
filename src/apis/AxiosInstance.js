import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

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