import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GoogleIcon, FacebookIcon } from './CustomIcons';

const SocialLogin = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => alert('Sign in with Google')}
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
