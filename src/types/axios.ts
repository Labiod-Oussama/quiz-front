import axios, { AxiosRequestConfig } from 'axios';
import { paths } from 'src/routes/paths';



const axiosInstance = axios.create({});


axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            if (window.location.pathname !== paths.auth.login) {
                window.location.href = paths.auth.login;
            }
        }
        return Promise.reject((error.response && error.response.data) || 'Something went wrong')

    }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
};



const API = `/api`
export const endpoints = {
    auth: {
        register: API + '/auth/register',
        login: API + '/auth/login',
    },
    account: {
        getMyInfos: `${API}/user/getMyInfos`,
    },
    patient: {
        getAll: `${API}/user/patients`,
        addOne: `${API}/user/patients`,
    },
    quiz: {
        getAll: `${API}/quiz`,
        getOne: (id: string | number) => `${API}/quiz/${id}`,
        saveQuiz: (id: string | number) => `${API}/quiz/${id}/save`,
    }
};
