import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import ForgotPassword from './ForgotPassword';
import SocialLogin from './form-components/SocialLogin';
import type { User } from '../../../types/User';
import useAuthApi from '../../../hooks/useAuthApi';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, isError, error, loginUser } = useAuthApi();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleOpenForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: User = { name: '', email, password };

    try {
      const { user, token } = await loginUser(payload);
      login(user.name, token);

      setEmail('');
      setPassword('');

      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <Stack
      spacing={2}
      padding={2}
      direction="column"
      sx={{
        minWidth: '400px',
        borderColor: 'primary.secondary',
      }}
    >
      <LoginIcon color="primary" />
      <Typography variant="h6" sx={{ width: '100%' }}>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email" required>
            Email:
          </FormLabel>
          <TextField
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="your@email.com"
            variant="outlined"
            required
            fullWidth
            autoFocus
            color="primary"
            error={email !== '' && !emailRegex.test(email)}
            helperText={
              email !== '' && !emailRegex.test(email)
                ? 'Invalid email format'
                : ''
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password" required>
            Password:
          </FormLabel>
          <TextField
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••"
            required
            fullWidth
            autoFocus
            color="primary"
          />
        </FormControl>
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
        <Button type="submit" fullWidth variant="contained">
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
        <Link
          component="button"
          type="button"
          onClick={handleOpenForgotPassword}
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Forgot your password?
        </Link>
        <ForgotPassword
          open={openForgotPassword}
          handleClose={handleCloseForgotPassword}
        />
        <Divider>or</Divider>
        <SocialLogin />
        <Typography sx={{ textAlign: 'center' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" variant="body2" sx={{ alignSelf: 'center' }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default Login;
