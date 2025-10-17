import { getAccessToken } from './api/tokenStore'
import io from 'socket.io-client'

const socket = io(import.meta.env.VITE_APP_URL, {
  auth: {
    token: getAccessToken()
  },
  transportOptions: {
    polling: {
      withCredentials: true
    }
  }
})

export default socket
