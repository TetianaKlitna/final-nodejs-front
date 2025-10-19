const ACCESS_KEY = 'accessToken'
const USER_KEY = 'username'

export const setAccessToken = (t: string | null) => {
  if (t) {
    localStorage.setItem(ACCESS_KEY, t)
  } else {
    localStorage.removeItem(ACCESS_KEY)
  }
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_KEY)
}

export const setUser = (currUsername: string | null) => {
  if (currUsername) {
    localStorage.setItem(USER_KEY, currUsername)
  } else {
    localStorage.removeItem(USER_KEY)
  }
}

export const getUser = (): string | null => {
  return localStorage.getItem(USER_KEY)
}

export const clearAuth = () => {
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(USER_KEY)
}
