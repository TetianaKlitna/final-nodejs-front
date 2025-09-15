import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth } from '../../../context/AuthContext';
import useAuthApi from '../../../hooks/useAuthApi';

const Logout = () => {
  const { logout } = useAuth();
  const { isLoading, isError, error, logoutUser } = useAuthApi();

  const handleLogout = async () => {
    const ok = await logoutUser();
    logout();
    if (!ok) {
      console.error('Logout failed');
    }
  };

  return (
    <>
      {isError && (
        <Box
          role="alert"
          sx={{
            color: 'error.main',
          }}
        >
          {typeof error === 'string' ? error : 'Something went wrong'}
        </Box>
      )}
      <Button
        color="inherit"
        size="large"
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Logout'}
      </Button>
    </>
  );
};

export default Logout;
