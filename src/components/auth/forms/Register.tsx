import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import SignUpIcon from '@mui/icons-material/PersonAdd';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import SocialLogin from './form-components/SocialLogin';
import useAuthApi from '../../../hooks/useAuthApi';
import type { User } from '../../../types/User';
import { useState, type FormEvent } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoading, isError, error, createUser } = useAuthApi();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: User = { name: fullName, email, password };

    try {
      const { user, token } = await createUser(payload);
      login(user.name, token);

      setFullName('');
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
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <SignUpIcon color="primary" />
        Register
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: 1,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="name" required>
            Full name:
          </FormLabel>
          <TextField
            autoComplete="name"
            name="name"
            placeholder="First and Last Name"
            required
            fullWidth
            id="name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            color="primary"
          />
        </FormControl>
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
          {isLoading ? 'Loading...' : 'Register'}
        </Button>
        <Divider>or</Divider>
        <SocialLogin />
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/login" variant="body2" sx={{ alignSelf: 'center' }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default Register;
