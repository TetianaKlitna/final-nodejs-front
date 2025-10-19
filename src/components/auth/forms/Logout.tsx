import Button from '@mui/material/Button'
import ErrorAlert from '../../alerts/ErrorAlert'
import useAuthApi from '../../../hooks/useAuthApi'
import { useAuth } from '../../../context/AuthContext'

const Logout = () => {
  const { isLoading, isError, error, logoutUser } = useAuthApi()
  const { logout } = useAuth()

  const handleLogout = async () => {
    logout()
    const ok = await logoutUser()
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
