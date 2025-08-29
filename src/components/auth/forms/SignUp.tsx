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

const SignUp = () => {
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const { isLoading, isError, error, createUser, createdUser } = useAuthApi();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: User = { id: 'number1', name: 'Tetiana' };
    createUser(user);
    console.log(createdUser, isLoading, isError, error);
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
      <SignUpIcon color="primary" />
      <Typography component="h1" variant="h4" sx={{ width: '100%' }}>
        Sign Up
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
            error={nameError}
            helperText={nameErrorMessage}
            color={nameError ? 'error' : 'primary'}
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
            placeholder="your@email.com"
            error={emailError}
            helperText={emailErrorMsg}
            variant="outlined"
            required
            fullWidth
            autoFocus
            color={emailError ? 'error' : 'primary'}
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
            placeholder="••••••"
            error={passwordError}
            helperText={passwordErrorMsg}
            required
            fullWidth
            autoFocus
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          //onClick={validateInputs}
        >
          Sign up
        </Button>
        <Divider>or</Divider>
        <SocialLogin />
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link href="/" variant="body2" sx={{ alignSelf: 'center' }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default SignUp;
