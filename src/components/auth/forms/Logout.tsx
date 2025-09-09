// components/auth/LogoutButton.tsx
import { Button } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  return (
    <Button color="inherit" size="large" onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;
