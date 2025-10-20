import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = () => {
  const { username } = useAuth()
  return username ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute
