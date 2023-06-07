import axios, { type AxiosError, type AxiosResponse } from 'axios';

import ApiException from '~/exceptions/ApiException';
import CustomException from '~/exceptions/CustomException';
import { errorMessage } from '~/exceptions/messages';
import { type ApiErrorScheme } from '~/exceptions/type';
import { isProd } from '~/utils/common';

const DEVELOPMENT_API_URL = ' https://testapi.nalab.me';
const PRODUCTION_API_URL = 'https://api.nalab.me';

const instance = axios.create({
  baseURL: isProd(process.env.NODE_ENV) ? PRODUCTION_API_URL : DEVELOPMENT_API_URL,
  withCredentials: true,
  timeout: 15000,
});

// TODO: 로그인 방법에 따라 헤더 변경 함수 필요할 수 있음

// Response interceptor
const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
};

// Response interceptor
const interceptorResponseRejected = (error: AxiosError<ApiErrorScheme>) => {
  if (error.response?.data?.['response-message']) {
    return Promise.reject(new ApiException(error.response.data, error.response.status));
  }

  if (error.message.startsWith('timeout')) {
    return Promise.reject(new CustomException(errorMessage.TIMEOUT, 'NETWORK_TIMEOUT'));
  }

  return Promise.reject(new CustomException(errorMessage.UNKNOWN_400, 'NETWORK_ERROR'));
};

instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

export const get = <T>(...args: Parameters<typeof instance.get>) => {
  return instance.get<T, T>(...args);
};

export const post = <T>(...args: Parameters<typeof instance.post>) => {
  return instance.post<T, T>(...args);
};

export const put = <T>(...args: Parameters<typeof instance.put>) => {
  return instance.put<T, T>(...args);
};

export const patch = <T>(...args: Parameters<typeof instance.patch>) => {
  return instance.patch<T, T>(...args);
};

export const del = <T>(...args: Parameters<typeof instance.delete>) => {
  return instance.delete<T, T>(...args);
};
