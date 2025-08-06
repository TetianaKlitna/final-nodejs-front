import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import { useState } from 'react';

const SignIn = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const handleClickOpen = () => {};
  const handleSubmit = () => {};

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
      <Typography component="h1" variant="h4" sx={{ width: '100%' }}>
        Sign in
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
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
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
          <TextField
            id="password"
            type="password"
            name="password"
            label="Password"
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
          onClick={handleClickOpen}
          variant="body2"
          sx={{ alignSelf: 'center' }}
        >
          Forgot your password?
        </Link>
        <Divider>or</Divider>
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
          <Typography sx={{ textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link href="/" variant="body2" sx={{ alignSelf: 'center' }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default SignIn;
