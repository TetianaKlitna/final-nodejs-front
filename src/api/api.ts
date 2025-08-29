import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export async function apiCall<T>(
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  data?: unknown
): Promise<T> {
  const response =
    method === 'get' || method === 'delete'
      ? await api[method]<T>(url)
      : await api[method]<T>(url, data);

  return response.data;
}
