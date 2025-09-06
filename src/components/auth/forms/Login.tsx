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
import { useState, type FormEvent } from 'react';

const Login = () => {
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const handleOpenForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          Sign in
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
          <Link href="/" variant="body2" sx={{ alignSelf: 'center' }}>
            Register
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
};

export default Login;
