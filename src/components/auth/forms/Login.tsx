import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SocialLogin from './form-components/SocialLogin';
import ErrorAlert from '../../alerts/ErrorAlert';
import type { User } from '../../../types/User';
import useAuthApi from '../../../hooks/useAuthApi';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, isError, error, loginUser } = useAuthApi();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: User = { name: '', email, password };
    try {
      const { accessToken, user } = await loginUser(payload);
      login(user.name, accessToken);

      setEmail('');
      setPassword('');

      navigate('/tasks', { replace: true });
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
      <Box
        component="form"
        onSubmit={handleSubmit}
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
            type="text"
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
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••"
            required
            fullWidth
            autoFocus
            color="primary"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </Button>
        {isError && <ErrorAlert message={error} />}
        <Link
          href="/forgotPassword"
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Forgot your password?
        </Link>
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
