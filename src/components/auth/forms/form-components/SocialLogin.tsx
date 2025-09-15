import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = () => {};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleGoogleLogin}
        startIcon={<GoogleIcon />}
      >
        Sign in with Google
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => alert('Sign in with Facebook')}
        startIcon={<FacebookIcon />}
      >
        Sign in with Facebook
      </Button>
    </Box>
  );
};

export default SocialLogin;
