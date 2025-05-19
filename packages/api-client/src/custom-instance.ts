import axios, { AxiosRequestConfig } from 'axios';

export const customInstance = async <T>({
  url,
  method,
  params,
  data,
  headers,
}: AxiosRequestConfig): Promise<T> => {
  const instance = axios.create({
    baseURL: 'http://www.mybackend.com',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  // Add request interceptor for authentication if needed
  instance.interceptors.request.use(
    (config) => {
      // You can add auth token here if needed
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors here
      return Promise.reject(error);
    }
  );

  const response = await instance.request({
    url,
    method,
    params,
    data,
  });

  return response.data;
};
