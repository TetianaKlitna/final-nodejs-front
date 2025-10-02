import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SocialLogin from './form-components/SocialLogin';
import ErrorAlert from '../../alerts/ErrorAlert';
import SuccessAlert from '../../alerts/SuccessAlert';
import useAuthApi from '../../../hooks/useAuthApi';
import type { User } from '../../../types/User';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorFormMsg, setErrorFormMsg] = useState('');
  const [successFormMsg, setSuccessFormMsg] = useState('');
  const { isLoading, isError, error, createUser } = useAuthApi();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorFormMsg('Passwords do not match.');
      return;
    }
    setErrorFormMsg('');
    const payload: User = { name: fullName, email, password };

    const success = await createUser(payload);

    if (success) {
      setSuccessFormMsg('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login', { replace: true }), 2000);
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
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ flex: 1 }}>
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
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel htmlFor="confirmPassword" required>
              Confirm Password
            </FormLabel>
            <TextField
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••"
              fullWidth
              autoFocus
              color="primary"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
        </Stack>
        {errorFormMsg && <ErrorAlert message={errorFormMsg} />}
        {isError && <ErrorAlert message={error} />}
        {successFormMsg && <SuccessAlert message={successFormMsg} />}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
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
