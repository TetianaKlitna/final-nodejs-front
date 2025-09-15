import axios from 'axios';
import { getAccessToken, setAccessToken } from './tokenStore';

const api = axios.create({
  withCredentials: true, //sends HttpOnly cookie automatically
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await api.post<{ accessToken: string }>(
          '/auth/refresh'
        );
        setAccessToken(data.accessToken);
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (refreshErr) {
        setAccessToken(null);
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
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
