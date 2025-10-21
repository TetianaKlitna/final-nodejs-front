import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { getAccessToken, setAccessToken, setUser } from './tokenStore'
import type { UserDTO } from '../types'

const BASE_URL = import.meta.env.VITE_APP_API_URL
const REFRESH_URL = '/auth/refresh'

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: 10000
})

const apiNoAuth = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: 10000
})

api.interceptors.request.use(config => {
  const token = getAccessToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise: Promise<string> | null = null

function isRefreshCall (cfg?: InternalAxiosRequestConfig) {
  const url = cfg?.url || ''
  return url.includes(REFRESH_URL)
}

function hardLogout () {
  setAccessToken(null)
  setUser(null)
}

api.interceptors.response.use(
  res => res,
  async (err: AxiosError) => {
    const original = err.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined
    const status = err.response?.status

    if (!original || original._retry || isRefreshCall(original)) {
      if (isRefreshCall(original) && status === 401) hardLogout()
      return Promise.reject(err)
    }

    if (status === 401) {
      original._retry = true

      if (!refreshPromise) {
        refreshPromise = apiNoAuth
          .post<{ accessToken: string; user: UserDTO }>(REFRESH_URL, null)
          .then(({ data }) => {
            setAccessToken(data?.accessToken ?? null)
            setUser(data?.user?.name ?? null)
            return data.accessToken
          })
          .catch(refreshErr => {
            hardLogout()
            throw refreshErr
          })
          .finally(() => {
            refreshPromise = null
          })
      }

      const newToken = await refreshPromise
      original.headers = original.headers ?? {}
      original.headers.Authorization = `Bearer ${newToken}`
      return api(original)
    }

    return Promise.reject(err)
  }
)

export async function apiCall<T> (
  method: 'get' | 'post' | 'patch' | 'delete',
  url: string,
  data?: unknown
): Promise<T> {
  const response =
    method === 'get' || method === 'delete'
      ? await api[method]<T>(url)
      : await api[method]<T>(url, data)

  return response.data
}
