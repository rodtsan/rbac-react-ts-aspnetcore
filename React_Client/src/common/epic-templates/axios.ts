import axios, { AxiosRequestConfig } from 'axios';
import { getBaseUrl, getPath, headerJson } from '@common/api';
import { clearState, getTokens, saveTokens } from '@store/localStorage';

/* Set default config for axios instance */
const axiosConfig: AxiosRequestConfig = {
    baseURL: getBaseUrl('profileBaseUrl'),
    headers: headerJson(),
    withCredentials: true
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        let newTokenServed = false;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios
                .post(getPath('refresh'), getTokens(), axiosConfig)
                .then(({ data }) => {
                    saveTokens(data);
                    axiosInstance.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${data.accessToken}`;
                    newTokenServed = true;
                    return axiosInstance.request(error.config);
                })
                .catch((error) => {
                    return Promise.reject(error);
                })
                .finally(() => {
                    if (newTokenServed) {
                        /* New token has been stored in cookie storage however, the page need to be reloaded */
                        window.location.reload();
                    } else {
                        /* The refresh token maybe expired or does not match */
                        clearState();
                        window.location.href = '/session-expired';
                    }
                });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
