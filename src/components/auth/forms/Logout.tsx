import Button from '@mui/material/Button'
import ErrorAlert from '../../alerts/ErrorAlert'
import { useAuth } from '../../../context/AuthContext'
import useAuthApi from '../../../hooks/useAuthApi'

const Logout = () => {
  const { logout } = useAuth()
  const { isLoading, isError, error, logoutUser } = useAuthApi()

  const handleLogout = async () => {
    const ok = await logoutUser()
    logout()
    if (!ok) {
      console.error('Logout failed')
    }
  }

  return (
    <>
      {isError && <ErrorAlert message={error} />}
      <Button
        color='inherit'
        size='large'
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Logout'}
      </Button>
    </>
  )
}

export default Logout
