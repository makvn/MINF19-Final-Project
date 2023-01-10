import { VITE_API_URL } from '@/config';
import Axios, { AxiosRequestConfig } from 'axios';
import storage from '../utils/storage';
import applyCaseMiddleware from 'axios-case-converter';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (!config.headers) return config;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = applyCaseMiddleware(
  Axios.create({
    baseURL: VITE_API_URL,
  }),
);

export const setTokenApi = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    return Promise.reject(error);
  },
);
